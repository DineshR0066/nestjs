import { Controller } from '@nestjs/common';
import { Body, Post, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { GetUser } from 'src/auth/get-user.decorator';
import { Role } from 'src/auth/roles.enum';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Customer)
    @Get('me')
    getMyProfile(@GetUser() user: any) {
        return user;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.usersService.findById(id);
    }
}
