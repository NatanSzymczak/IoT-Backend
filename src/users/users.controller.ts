import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getAll();
  }

  @Get('/:id')
  getReading(@Param('id') id: string) {
    return this.readingsService.getById(parseInt(id));
  }

  @Post()
  addUser(@Body() body: CreateUserDto) {
    return this.usersService.add(body.firstName, body.lastName, body.isActive);
  }
}
