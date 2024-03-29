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
import { ReadingsService } from './readings.service';
import { CreateReadingDto } from './dtos/create-reading.dto';

@Controller('readings')
export class ReadingsController {
  constructor(private readingsService: ReadingsService) {}

  @Get()
  getAllReadings() {
    return this.readingsService.getAll();
  }

  @Get('/:id')
  getReadingById(@Param('id') id: string) {
    return this.readingsService.getById(parseInt(id));
  }

  @Post()
  addReading(@Body() body: CreateReadingDto) {
    return this.readingsService.add(
      body.temperature,
      body.pressure,
      body.flow,
      body.pH,
    );
  }

  @Patch('/:id')
  editProduct(@Body() body: CreateReadingDto, @Param('id') id: string) {
    return this.readingsService.edit(+id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  removeReading(@Param('id') id: string) {
    this.readingsService.remove(+id);
  }

  @Get('run/generator')
  generateReadings() {
    return this.readingsService.generator();
  }

  @Get('run/simulator')
  deviceSimulator() {
    return this.readingsService.deviceSimulatorUser5Id();
  }
}
