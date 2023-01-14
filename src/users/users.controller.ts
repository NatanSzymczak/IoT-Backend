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

  @Delete('/:id')
  @HttpCode(204)
  removeReading(@Param('id') id: string) {
    this.readingsService.remove(+id);
  }

  @Patch('/:id')
  editProduct(@Body() body: EditProductDto, @Param('id') id: string) {
    return this.readingsService.edit(+id, body.price);
  }
}
