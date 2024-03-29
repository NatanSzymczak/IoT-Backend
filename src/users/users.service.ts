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
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.isActive = isActive;
    await this.repo.save(newUser);
    return newUser;
  }

  async edit(id: number, body: any) {
    const user = await this.repo.findOne({ where: { id } });
    body.firstName && (user.firstName = body.firstName);
    body.lastName && (user.lastName = body.lastName);
    user.isActive = body.isActive;
    await this.repo.save(user);
    return user;
  }

  async remove(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    await this.repo.remove(user);
  }
}
