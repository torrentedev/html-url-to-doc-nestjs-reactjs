import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';
import { Document, Packer, Paragraph, TextRun, ImageRun, Table, TableCell, TableRow, WidthType } from 'docx';
import axios from 'axios';
import * as htmlToDocx from 'html-to-docx';
import { v4 as uuidv4 } from 'uuid';
import * as imageDownloader from 'image-downloader';
import { URL } from 'url';

@Injectable()
export class FileService {
  private async downloadImage(url: string, baseUrl: string): Promise<Buffer> {
    try {
      const absoluteUrl = new URL(url, baseUrl).href;
      const dest = path.join(__dirname, '../../uploads', `${uuidv4()}.png`);
      const options = {
        url: absoluteUrl,
        dest: dest, // Especificar el destino donde se guardará la imagen
      };
      const { filename } = await imageDownloader.image(options);
      return fs.readFileSync(filename);
    } catch (error) {
      console.error("Error downloading image:", error);
      throw new HttpException('Error downloading image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async convertHtmlToDoc(htmlContent: string, baseUrl: string): Promise<string> {
    try {
      const uploadsDir = path.join(__dirname, '../../uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
      }

      const $ = cheerio.load(htmlContent);

      // Eliminar etiquetas y scripts no deseados
      $('script, style, iframe').remove();

      const paragraphs: Paragraph[] = [];

      // Convertir imágenes base64 a PNG y actualizar las rutas en el HTML
      $('img').each((index, img) => {
        const src = $(img).attr('src');
        if (src && src.startsWith('data:image')) {
          const base64Data = src.split(',')[1];
          const imageBuffer = Buffer.from(base64Data, 'base64');
          const imagePath = path.join(uploadsDir, `${uuidv4()}.png`);
          fs.writeFileSync(imagePath, imageBuffer);

          const imageRun = new ImageRun({
            data: imageBuffer,
            transformation: {
              width: 600,
              height: 400,
            },
            type: 'png',
          });

          paragraphs.push(new Paragraph({
            children: [imageRun],
          }));

          $(img).attr('src', `file://${imagePath}`);
        }
      });

      // Descargar y procesar imágenes con URL
      await Promise.all($('img').map(async (index, img) => {
        const src = $(img).attr('src');
        if (src && !src.startsWith('data:image')) {
          const imageBuffer = await this.downloadImage(src, baseUrl);
          const imagePath = path.join(uploadsDir, `${uuidv4()}.png`);
          fs.writeFileSync(imagePath, imageBuffer);

          const imageRun = new ImageRun({
            data: imageBuffer,
            transformation: {
              width: 600,
              height: 400,
            },
            type: 'png',
          });

          paragraphs.push(new Paragraph({
            children: [imageRun],
          }));

          $(img).attr('src', `file://${imagePath}`);
        }
      }).get());

      // Procesar otros elementos HTML para mejorar el estilo del documento
      $('h1, h2, h3, h4, h5, h6').each((index, element) => {
        const level = parseInt(element.tagName[1], 10);
        const text = $(element).text();
        const headingMap = {
          1: "Heading1",
          2: "Heading2",
          3: "Heading3",
          4: "Heading4",
          5: "Heading5",
          6: "Heading6",
        };
        paragraphs.push(new Paragraph({
          text: text,
          heading: headingMap[level],
        }));
      });

      $('p').each((index, element) => {
        const text = $(element).text();
        paragraphs.push(new Paragraph({
          text: text,
          spacing: { after: 200 },
        }));
      });

      $('table').each((index, table) => {
        const rows = $(table).find('tr');
        const docxRows = rows.map((i, row) => {
          const cells = $(row).find('td, th');
          const docxCells = cells.map((j, cell) => {
            const text = $(cell).text();
            return new TableCell({
              children: [new Paragraph(text)],
              width: {
                size: 100 / cells.length,
                type: WidthType.PERCENTAGE,
              },
            });
          }).get();
          return new TableRow({
            children: docxCells,
          });
        }).get();

        paragraphs.push(new Paragraph({
          children: [new Table({
            rows: docxRows,
          })],
        }));
      });

      // Crear el documento de Word
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: paragraphs,
          },
        ],
      });

      const buffer = await Packer.toBuffer(doc);

      const outputPath = path.join(uploadsDir, `${uuidv4()}.docx`);
      fs.writeFileSync(outputPath, buffer);

      return outputPath;
    } catch (error) {
      console.error("Error in convertHtmlToDoc:", error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async convertUrlToDoc(url: string): Promise<string> {
    try {
      const response = await axios.get(url);
      const htmlContent = response.data;

      return this.convertHtmlToDoc(htmlContent, url);
    } catch (error) {
      console.error("Error in convertUrlToDoc:", error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

