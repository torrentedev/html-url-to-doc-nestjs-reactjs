import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar el límite de tamaño del cuerpo de la solicitud
  app.use(bodyParser.json({ limit: '500mb' }));
  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Permitir solicitudes desde este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
