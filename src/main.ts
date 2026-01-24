import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import open from 'open';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Next.js ke liye required

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // removes extra fields
      forbidNonWhitelisted: true, // throws error if extra fields sent
      transform: true,        // auto-transform payloads to DTO classes
    }),
  );

  const config = new DocumentBuilder().setTitle('D2D Backend API').setDescription('User management APIs').setVersion('1.0').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);

  // 🔥 AUTO OPEN SWAGGER
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NEST_WATCH !== 'true'
  ) {
    open(`http://localhost:${port}/api-docs`);
  }
} 
bootstrap();
