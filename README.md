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
```


###  Configuración del Backend
Navegar al directorio del backend.


```bash
cd backend
npm install
```

Crear un archivo .env en el directorio backend y configurar las variables de entorno necesarias (si las hay).

###  Iniciar el servidor de desarrollo.

```bash
npm run start
```
###  Configuración del Frontend
Navegar al directorio del frontend.

```bash
cd frontend
npm install
```

###  Iniciar la aplicación de desarrollo.

```bash
npm start
```

###  Uso
Acceder a la aplicación frontend en http://localhost:3000.
- Para convertir HTML a DOCX:
- Pegar el contenido HTML en el área de texto.
- Hacer clic en "Convert HTML to DOCX".
- Descargar el archivo DOCX generado.
- Para convertir una URL a DOCX:
- Ingresar la URL en el campo de entrada.
- Hacer clic en "Convert URL to DOCX".
- Descargar el archivo DOCX generado


###  Recomendaciones
Asegúrate de tener una conexión a Internet estable para que el backend pueda descargar imágenes desde URLs externas.
Verifica que las URLs ingresadas sean accesibles y válidas.
Para mejorar la conversión de HTML, asegúrate de que el contenido HTML esté bien formado y estructurado.

###  Dependencias
- Backend
- - @nestjs/common
- - @nestjs/core
- - @nestjs/platform-express
- - axios
- - cheerio
- - docx
- - html-to-docx
- - uuid
- - image-downloader

- Frontend
- - react
- - react-dom
- - react-scripts
- - @mui/material
- - @emotion/react
- - @emotion/styled
- - @mui/icons-material
- - react-toastify

###  DLicencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para obtener más detalles.