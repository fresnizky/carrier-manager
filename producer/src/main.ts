import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GqlHttpExceptionFilter } from './common/filters/gql-http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new GqlHttpExceptionFilter());
  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
