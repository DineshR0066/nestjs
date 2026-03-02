import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Order, orderSchema } from 'src/schemas/orders.schema';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Order.name,
            schema: orderSchema,
        }]),
        AuthModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
