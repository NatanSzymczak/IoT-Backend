import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  getAll() {
    return this.repo.find();
  }

  getById(id: number) {
    return this.repo.findOne({
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    const product = await this.repo.findOne(id);
    this.repo.remove(product);
  }


  async add(firstName: string, lastName: string, isActive: boolean) {
    const newReading = new User();
    await this.repo.save(newReading);
  }

  async edit(id: number, price: number) {
    const product = await this.repo.findOne(id);
    product.price = price;
    return this.repo.save(product);
  }
}