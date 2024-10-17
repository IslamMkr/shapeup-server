import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_CONNECTION_STRING'),
            }),
        }),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => [
                {
                    ttl: configService.get<number>('THROTTLE_TTL'),
                    limit: configService.get<number>('THROTTLE_LIMIT'),
                },
            ],
        }),
        AuthModule,
        UsersModule,
    ],
    providers: [
        { provide: 'APP_GUARD', useClass: JwtAuthGuard },
        {
            provide: 'APP_GUARD',
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
