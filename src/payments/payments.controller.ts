import { UpdatePaymentDto } from './dto/update.payment.dto';
import { Controller, Get, Post, Patch, Query, Param, NotFoundException, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import mongoose from 'mongoose';
import { CreatePaymentDto } from './dto/create.payment.dto';

@Controller('payments')
export class PaymentsController {
    constructor( private paymentService: PaymentsService) {}
    // @Get()
    // getPayment() {
    //     return this.paymentService.getPayment();
    // }

    @Get()
    getPaymentByPage(
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number
    ) {
        return this.paymentService.getPaymentByPage(page, limit);
    }
    
    @Get('search/:payment_type')
    searchByType(@Param('payment_type') payment_type: string) {
        return this.paymentService.searchByType(payment_type);
    }

    @Get("total-payment/:payment_type")
    getTotalPaymentByType(@Param('payment_type') payment_type: string) {
        return this.paymentService.getTotalPaymentByType(payment_type);
    }

    @Get(':id')
    getPaymentById(@Param('id') id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException('Payment Not found');
        return this.paymentService.getPaymentById(id);
    }

    @Post()
    createPayment(@Body() createPaymentDto:CreatePaymentDto) {
        return this.paymentService.createPayment(createPaymentDto);
    }

    @Patch("update/:id")
    updatePayment(@Param('id') id: string, updatePayementDto:UpdatePaymentDto) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException('Payment Not found');
        return this.paymentService.updatePayment(id, updatePayementDto);
    }

    @Patch('delete/:id')
    DeletePayment(@Param('id') id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException('Payment Not found');
        return this.paymentService.deletePayment(id);
    }
}
