import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

/**
 * Initializes and configures the NestJS application.
 *
 * This function performs the following tasks:
 * - Creates a new NestJS application instance using the `AppModule`.
 * - Enables Cross-Origin Resource Sharing (CORS) for the application.
 * - Adds security middleware using `helmet`.
 * - Sets up global validation pipes with `ValidationPipe` to automatically
 *   validate and transform incoming requests.
 * - Starts the application and listens on port 3000.
 *
 * @returns {Promise<void>} A promise that resolves when the application is successfully started.
 */
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
