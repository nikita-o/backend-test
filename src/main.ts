import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { QueryExceptionsFilter } from './queryExceptions.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config: ConfigService = app.get(ConfigService);

  app.useGlobalFilters(new QueryExceptionsFilter());

  const configSwagger = new DocumentBuilder()
    .setTitle('WORK API')
    .setDescription('API description')
    .addTag('auth')
    .addTag('user')
    .addTag('shop')
    .addTag('product')
    .addTag('purchase')
    .addTag('statistics')
    .addCookieAuth('JWTtoken')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.get('port'));
}
bootstrap();
