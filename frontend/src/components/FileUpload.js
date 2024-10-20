import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';

const FileUpload = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [url, setUrl] = useState('');

  const handleHtmlChange = (event) => {
    setHtmlContent(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmitHtml = async (event) => {
    event.preventDefault();

    if (!htmlContent) {
      toast.error('Please paste HTML content to convert');
      return;
    }

    try {
      toast.info('Detectando contenido HTML...');
      const response = await axios.post('http://localhost:3000/file/convert-html', { htmlContent }, {
        responseType: 'blob',
      });

      toast.info('Fueron importadas las imágenes.');
      toast.info('Fueron incrustadas en el archivo de docx las imágenes.');

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'converted.docx');
      document.body.appendChild(link);
      link.click();

      toast.success('Conversión exitosa...');
    } catch (error) {
      toast.error('Lo siento algo salió mal.');
    }
  };

  const handleSubmitUrl = async (event) => {
    event.preventDefault();

    if (!url) {
      toast.error('Please enter a URL to convert');
      return;
    }

    try {
      toast.info('Detectando URL...');
      toast.info('Analizando URL...');
      const response = await axios.post('http://localhost:3000/file/convert-url', { url }, {
        responseType: 'blob',
      });

      toast.info('Fueron importadas las imágenes.');
      toast.info('Fueron incrustadas en el archivo de docx las imágenes.');

      toast.info('Recibiendo datos...');
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = urlBlob;
      link.setAttribute('download', 'converted.docx');
      document.body.appendChild(link);
      link.click();

      toast.success('Conversión exitosa...');
    } catch (error) {
      toast.error('Lo siento algo salió mal.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Convert HTML or URL to DOCX
      </Typography>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <form onSubmit={handleSubmitHtml}>
          <Typography variant="h6" gutterBottom>
            Paste HTML Content
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={10}
            value={htmlContent}
            onChange={handleHtmlChange}
            placeholder="Paste your HTML content here"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" type="submit">
            Convert HTML to DOCX
          </Button>
        </form>
      </Paper>
      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={handleSubmitUrl}>
          <Typography variant="h6" gutterBottom>
            Enter URL
          </Typography>
          <TextField
            fullWidth
            value={url}
            onChange={handleUrlChange}
            placeholder="Enter the URL here"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" type="submit">
            Convert URL to DOCX
          </Button>
        </form>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default FileUpload;



