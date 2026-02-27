import { Controller, Get, Post, Patch, Param, Body, NotFoundException, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import mongoose from 'mongoose';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create.order-item.dto';
import { UpdateOrderItemDto } from './dto/update.order-item.dto';

@Controller('order-items')
export class OrderItemsController {
    constructor( private orderItemService: OrderItemsService) {}

    // @Get()
    // getOrderItem() {
    //     return this.orderItemService.getOrderItems()
    // }

    @Get()
    getOrderItem(
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number
    ) {
        return this.orderItemService.getOrderItemByPage(page, limit);
    }

     @Get("seller-cost/:seller_id")
    getTotalPriceBySellerId(@Param('seller_id') seller_id: string) {
        return this.orderItemService.getTotalPriceBySellerId(seller_id);
    }

    @Get("product-cost/:product_id")
    getTotalPriceByProductId(@Param('product_id') product_id: string) {
        return this.orderItemService.getTotalPriceByProductId(product_id);
    }

    @Get("expense-by-seller/:seller_id")
    getExpenseBySellerId(@Param('seller_id') seller_id: string) {
        return this.orderItemService.getExpenseBySellerId(seller_id);
    }

    @Get(':id')
    getOrderItemById(@Param('id') id: string ) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException("order item not found");
        return this.orderItemService.getOrderItemById(id);
    }
    
    @Post()
    createOrderItem(@Body() createOrderItemDto: CreateOrderItemDto) {
        return this.orderItemService.createOrderItem(createOrderItemDto);
    }

    @Patch(':id')
    updateOrderItem(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException("order item not found");
        return this.orderItemService.updateOrderItem(id, updateOrderItemDto);
    }

    @Patch(':id')
    deleteOrderitem(@Param('id') id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException("order item not found");
        return this.orderItemService.deleteOrderItem(id);
    }

   
}
