import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function shapeup() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(helmet());
    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.listen(3000);
}
shapeup();
