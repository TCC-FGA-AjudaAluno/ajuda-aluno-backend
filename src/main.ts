import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: ['*'], methods: ['GET', 'PUT', 'PATCH', 'POST', 'HEAD', 'OPTION']});
  await app.listen(3000);
}
bootstrap();
