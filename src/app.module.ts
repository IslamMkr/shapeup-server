import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
    imports: [ConfigModule.forRoot(), AuthModule, UsersModule],
    controllers: [AppController],
    providers: [AppService, { provide: 'APP_GUARD', useClass: JwtAuthGuard }],
})
export class AppModule {}
