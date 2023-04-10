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

  async add(firstName: string, lastName: string, isActive: boolean) {
    const newReading = new User();
    newReading.firstName = firstName;
    newReading.lastName = lastName;
    newReading.isActive = isActive;
    await this.repo.save(newReading);
  }

  async remove(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    await this.repo.remove(user);
  }
}
