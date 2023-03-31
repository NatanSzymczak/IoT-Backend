import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getById(parseInt(id));
  }

  @Post('/')
  addUser(@Body() body: CreateUserDto) {
    return this.usersService.add(body.firstName, body.lastName, body.isActive);
  }

  @Patch('/:id')
  editUser(@Body() body: CreateUserDto, @Param('id') id: string) {
    return this.usersService.edit(+id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  removeReading(@Param('id') id: string) {
    this.usersService.remove(+id);
  }
}
