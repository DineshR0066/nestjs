import { Controller, Get, Param, Post, Body, Patch, Query, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create.order.dto';
import { UpdateOrderDto } from './dto/update.order.dto';
import mongoose from 'mongoose';



@Controller('orders')
export class OrdersController {
    constructor( private orderService: OrdersService) {}
    // @Get()
    // getOrders() {
    //     return this.orderService.getOrder()
    // }

    @Get()
    getOrderByPage(
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number
     ) {
        return this.orderService.getOrderByPage(page, limit);
     }

     @Get('order-status/:order_status')
     getOrderRevenueByStatus(@Param('order_status') order_status: string) {
        return this.orderService.getOrderRevenueByStatus(order_status);
     }

    @Get(':id') 
    getOrdersById(@Param('id') id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException('Order Not found');
        return this.orderService.getOrderById(id);
    }

    @Post()
    createOrder(@Body() createOrderDto:CreateOrderDto){
        return this.orderService.createOrder(createOrderDto);
    }
    @Patch('update/:id')
    updateOrder(@Param('id') id: string,@Body() updateOrderDto: UpdateOrderDto) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException('Order Not found');
        return this.orderService.updateOrder(id, updateOrderDto);
    }

    @Patch('delete/:id')
    deleteOrder (@Param('id') id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException('Order Not found');
        return this.orderService.deleteOrder(id);
    }

    
}
