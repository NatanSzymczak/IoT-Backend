import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reading } from './readings.entity';

@Injectable()
export class ReadingsService {
  constructor(@InjectRepository(Reading) private repo: Repository<Reading>) {}

  getAll() {
    return this.repo.find();
  }

  async add() {}

  async generator() {}

  async deviceSimulatorUser5Id() {}
}
