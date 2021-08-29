import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const config: ConfigService = app.get(ConfigService)

  app.useGlobalPipes(new ValidationPipe());

  const configSwagger = new DocumentBuilder()
  .setTitle('WORK API')
  .setDescription('API description')
  .addTag('user')
  .addTag('shop')
  .addTag('product')
  .addCookieAuth('JWTtoken')
  .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.get('port'));
}
bootstrap();
