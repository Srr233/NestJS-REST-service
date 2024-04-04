import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      version: string;
    }
  }
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
