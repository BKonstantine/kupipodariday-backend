import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServerExceptionFilter } from './filter/server-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new ServerExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8080);
}
bootstrap();
