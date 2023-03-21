import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { Reading } from './readings.entity';

const randomValueGenerator = () => {
  const newReading = new Reading();
  newReading.temperature = Math.round(Math.random() * (55 - 45) + 45);
  newReading.pressure = Math.round(Math.random() * (55 - 45) + 45);
  newReading.flow = Math.round(Math.random() * (65 - 55) + 55);
  newReading.pH = +(Math.random() * (7.4 - 6.6) + 6.6).toFixed(1);
  return newReading;
};

@Injectable()
export class ReadingsService {
  constructor(@InjectRepository(Reading) private repo: Repository<Reading>) {}

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

  async add(temperature: number, pressure: number, flow: number, pH: number) {
    const newReading = new Reading();
    newReading.temperature = temperature;
    newReading.pressure = pressure;
    newReading.flow = flow;
    newReading.pH = pH;
    await this.repo.save(newReading);
    return newReading;
  }

  async edit(id: number, body: any) {
    const reading = await this.repo.findOne({ where: { id } });
    body.temperature && (reading.temperature = body.temperature);
    body.pressure && (reading.pressure = body.pressure);
    body.flow && (reading.flow = body.flow);
    body.pH && (reading.pH = body.pH);
    await this.repo.save(reading);
    return reading;
  }

  async remove(id: number) {
    const reading = await this.repo.findOne({ where: { id } });
    await this.repo.remove(reading);
  }

  async generator() {
    const allDayReadings = [];

    for (let i = 1; i < 5; i++) {
      const user = new User();
      user.id = i;

      for (let i = 0; i < 24; i++) {
        const newReading = randomValueGenerator();
        newReading.user = user;
        allDayReadings.push(newReading);
      }
    }
    await this.repo.save(allDayReadings);
  }

  async deviceSimulatorUser5Id() {
    const simulator = () => {
      const user = new User();
      user.id = 4;
      const newReading = randomValueGenerator();
      newReading.user = user;
      this.repo.save(newReading);
    };
    await setInterval(simulator, 5000);
  }
}
