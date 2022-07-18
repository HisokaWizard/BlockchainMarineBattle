import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const PORT = process.env.PORT ?? 9000;
    const app = await NestFactory.create(AppModule);

    await app.listen(PORT, () => console.log('App is working!!'));
  } catch (error) {
    console.log(error);
  }
};

start();
