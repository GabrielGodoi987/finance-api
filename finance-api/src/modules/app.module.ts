import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bullmq';
import { ApiTokenMiddleware } from '../commons/middlewares/api-token/api-token.middleware';
import { AssetsModule } from './system/assets/assets.module';
import { NotificationModule } from './notification/notification.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './processing/orders/orders.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
    }),
    EventEmitterModule.forRoot(),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
        },
      }),
      inject: [ConfigService],
    }),
    AssetsModule,
    OrdersModule,
    PrismaModule,
    SharedModule,
    NotificationModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiTokenMiddleware).forRoutes('*');
  }
}
