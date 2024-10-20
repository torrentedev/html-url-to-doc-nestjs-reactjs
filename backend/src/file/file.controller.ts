import { Controller, Post, Body, Res, HttpException, HttpStatus } from '@nestjs/common';
import { FileService } from './file.service';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('convert-html')
  async convertHtmlToDoc(@Body('htmlContent') htmlContent: string, @Res() res: Response) {
    try {
      if (!htmlContent) {
        throw new HttpException('HTML content is required', HttpStatus.BAD_REQUEST);
      }

      const baseUrl = 'http://localhost';

      const outputPath = await this.fileService.convertHtmlToDoc(htmlContent, baseUrl);

      res.download(outputPath, (err) => {
        if (err) {
          console.error("Error downloading the file:", err);
          throw new HttpException('Error downloading the file', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        fs.unlinkSync(outputPath);
      });
    } catch (error) {
      console.error("Error in convertHtmlToDoc:", error);
      res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).send(error.message || 'Internal server error');
    }
  }

  @Post('convert-url')
  async convertUrlToDoc(@Body('url') url: string, @Res() res: Response) {
    try {
      if (!url) {
        throw new HttpException('URL is required', HttpStatus.BAD_REQUEST);
      }

      const outputPath = await this.fileService.convertUrlToDoc(url);

      res.download(outputPath, (err) => {
        if (err) {
          console.error("Error downloading the file:", err);
          throw new HttpException('Error downloading the file', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        fs.unlinkSync(outputPath);
      });
    } catch (error) {
      console.error("Error in convertUrlToDoc:", error);
      res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).send(error.message || 'Internal server error');
    }
  }
}



