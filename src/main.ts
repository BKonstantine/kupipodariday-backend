import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServerExceptionFilter } from './filter/server-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ServerExceptionFilter());
  await app.listen(8080);
}
bootstrap();
