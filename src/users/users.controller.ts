import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
}
