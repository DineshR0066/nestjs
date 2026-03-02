import { UpdatePaymentDto } from './dto/update.payment.dto';
import { Controller, Get, Post, Patch, Query, Param, NotFoundException, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import mongoose from 'mongoose';
import { CreatePaymentDto } from './dto/create.payment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { GetUser } from 'src/auth/get-user.decorator';
import { Role } from 'src/auth/roles.enum';

@Controller('payments')
export class PaymentsController {
    constructor( private paymentService: PaymentsService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Customer)
    @Get()
    getPaymentByPage(
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number,
        @GetUser() user: any,
    ) {
        return this.paymentService.getPaymentByPage(page, limit, user);
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get('search/:payment_type')
    searchByType(@Param('payment_type') payment_type: string) {
        return this.paymentService.searchByType(payment_type);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get("total-payment/:payment_type")
    getTotalPaymentByType(@Param('payment_type') payment_type: string) {
        return this.paymentService.getTotalPaymentByType(payment_type);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Customer)
    @Get(':id')
    async getPaymentById(@Param('id') id: string, @GetUser() user: any) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException('Payment Not found');
        const payment = await this.paymentService.getPaymentById(id);
        if (user.role !== 'admin') {
            const allowed = await this.paymentService.isPaymentOwnedByUser(payment._id.toString(), user._id.toString());
            if (!allowed) {
                throw new NotFoundException('Payment Not found');
            }
        }
        return payment;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post()
    createPayment(@Body() createPaymentDto:CreatePaymentDto) {
        return this.paymentService.createPayment(createPaymentDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Patch("update/:id")
    updatePayment(@Param('id') id: string, updatePayementDto:UpdatePaymentDto) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException('Payment Not found');
        return this.paymentService.updatePayment(id, updatePayementDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Patch('delete/:id')
    DeletePayment(@Param('id') id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException('Payment Not found');
        return this.paymentService.deletePayment(id);
    }
}
