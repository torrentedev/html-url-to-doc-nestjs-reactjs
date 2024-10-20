# HTML to DOCX Converter

Este proyecto permite convertir contenido HTML o una URL de una página web a un archivo DOCX. Utiliza NestJS para el backend y ReactJS para el frontend.

## Descripción

La aplicación permite a los usuarios:

- Pegar contenido HTML y convertirlo en un archivo DOCX.
- Ingresar una URL y convertir la página web en un archivo DOCX.
- El proceso incluye la conversión de imágenes base64 y la descarga de imágenes desde URLs.

## Tecnologías Utilizadas

- **Backend:**
  - [NestJS](https://nestjs.com/)
  - [Axios](https://axios-http.com/)
  - [Cheerio](https://cheerio.js.org/)
  - [Docx](https://www.npmjs.com/package/docx)
  - [HTML-to-DOCX](https://www.npmjs.com/package/html-to-docx)
  - [UUID](https://www.npmjs.com/package/uuid)
  - [Image Downloader](https://www.npmjs.com/package/image-downloader)
- **Frontend:**
  - [ReactJS](https://reactjs.org/)
  - [Material-UI](https://mui.com/)
  - [React-toastify](https://fkhadra.github.io/react-toastify/)

## Requisitos Previos

- Node.js (>= 14.x)
- npm (>= 6.x)

## Instalación

### Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/html-to-doc-nestjs-reactjs.git
cd html-to-doc-nestjs-reactjs
