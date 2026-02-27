import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { OrderItemModule } from './order-items/order-items.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaymentModule } from './payments/payment.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB'),
      }),
    }),
    OrdersModule,
    OrderItemModule,
    
    PaymentModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}
