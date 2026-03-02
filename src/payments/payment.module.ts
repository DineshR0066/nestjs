import { Payment, paymentSchema } from './../schemas/payments.schema';
import { Order, orderSchema } from 'src/schemas/orders.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Payment.name,
                schema: paymentSchema,
            },
            {
                name: Order.name,
                schema: orderSchema,
            },
        ]),
        AuthModule,
    ],
    controllers: [PaymentsController],
    providers: [PaymentsService]
})
export class PaymentModule {}