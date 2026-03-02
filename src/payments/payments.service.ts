import { UpdatePaymentDto } from './dto/update.payment.dto';
import { CreatePaymentDto } from './dto/create.payment.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from 'src/schemas/payments.schema';
import { Order } from 'src/schemas/orders.schema';


@Injectable()
export class PaymentsService {
    constructor(
        @InjectModel(Payment.name) private paymentModel: Model<Payment>,
        @InjectModel(Order.name) private orderModel: Model<Order>,
    ) {}

    async getPaymentByPage(page: number, limit: number, user?: any) {
        const skip = (page - 1) * limit;
        const filter: any = { is_deleted: false };
        if (user && user.role !== 'admin') {
            const orders = await this.orderModel.find({
                customer_id: user._id.toString(),
                is_deleted: false,
            }).select('order_id');
            const orderIds = orders.map((o) => o.order_id);
            filter.order_id = { $in: orderIds };
        }
        const payments = await this.paymentModel.find(filter)
            .skip(skip)
            .limit(limit);
        const totalPayments = await this.paymentModel.countDocuments(filter);
        return {
            page,
            limit,
            totalPayments,
            totalPages: Math.ceil(totalPayments / limit),
            payments,
        };
    }

    async getPaymentById(id: string) {
        const payment = await this.paymentModel.findOne(
            { _id: id, is_deleted: false },
        );
        if (!payment) {
            throw new NotFoundException("payment not found");
        }
        return payment;
    }

    async isPaymentOwnedByUser(paymentId: string, userId: string): Promise<boolean> {
        const payment = await this.paymentModel.findById(paymentId);
        if (!payment) return false;
        const order = await this.orderModel.findOne({ order_id: payment.order_id });
        if (!order) return false;
        return order.customer_id === userId;
    }

    async searchByType(type: string) {
        const payments = await this.paymentModel.aggregate([
            {   
                $search:{
                    index: 'default',
                    text: {
                        query: type,
                        path: 'payment_type',
                        fuzzy:{},
                    }
                }
            }
        ]).limit(20);
        return payments;
    }

    async getTotalPaymentByType(type: string) {
        const result = await this.paymentModel.aggregate([
                {
                $match: { 
                    payment_type: type, 
                    is_deleted: false 
                }
                },
                {
                $group: {
                    _id: "$payment_type",
                    totalPayment: { $sum: "$payment_value" }
                }
                }
            ]);
    return result;
    }

    async createPayment(createPaymentDto:CreatePaymentDto) {
        const newPayment = await new this.paymentModel(createPaymentDto);
        return newPayment;
    }

    async updatePayment(id: string, updatePaymentdto:UpdatePaymentDto) {
        const updatedPayment = await this.paymentModel.findOneAndUpdate(
            {_id: id , is_deleted: false},
            updatePaymentdto,
            {returnDocument: 'after'},
        )
        if(!updatedPayment) throw new NotFoundException("payment not found");
        return updatedPayment ;
    }

    async deletePayment(id: string) {
        const deletedPayment = await this.paymentModel.findOneAndUpdate(
            {_id: id, is_deleted: false},
            {is_deleted: true},
            {returnDocument: "after"}
        )
        if(!deletedPayment) throw new NotFoundException("payment not found");
        return deletedPayment;
    }
}

