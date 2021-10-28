import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configSwagger = new DocumentBuilder()
    .setTitle('Recipes')
    .setDescription('This is a recipe api')
    .setVersion('1.0')
    .addTag('Recipes')
    .addCookieAuth('Authentication')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use(cookieParser());

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  const configService: ConfigService = app.get(ConfigService);

  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('PORT'));
  console.log(`http://localhost:${configService.get('PORT')}/api`);
}
bootstrap();
