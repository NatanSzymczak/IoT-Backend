import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { Reading } from './readings.entity';

const hourGenerator = (i) => {
  const hour = i.toString();
  hour.length === 1 ? '0'.concat(hour) : hour;
  return hour;
};

@Injectable()
export class ReadingsService {
  constructor(@InjectRepository(Reading) private repo: Repository<Reading>) {}

  getAll() {
    return this.repo.find();
  }

  // getById(id: number) {
  //   return this.repo.findOne({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }

  async add(
    timestamp: string,
    temperature: number,
    pressure: number,
    flow: number,
    pH: number,
  ) {
    const newReading = new Reading();
    // newReading.timestamp = timestamp;
    newReading.temperature = temperature;
    newReading.pressure = pressure;
    newReading.flow = flow;
    newReading.pH = pH;
    await this.repo.save(newReading);
  }

  async generator() {
    const allDayReadings = [];

    for (let i = 1; i < 5; i++) {
      const user = new User();
      user.id = i;

      for (let i = 0; i < 24; i++) {
        const newReading = new Reading();
        newReading.user = user;
        const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
        // newReading.timestamp = `2020-12-01 ${i < 10 ? `0${i}` : `${i}`}:30:00`;
        // newReading.timestamp = `01/12/2022 ${i < 10 ? `0${i}` : `${i}`}:30:00`;
        newReading.temperature = Math.round(Math.random() * (55 - 45) + 45);
        newReading.pressure = Math.round(Math.random() * (55 - 45) + 45);
        newReading.flow = Math.round(Math.random() * (65 - 55) + 55);
        newReading.pH = +(Math.random() * (7.4 - 6.6) + 6.6).toFixed(1);
        allDayReadings.push(newReading);
      }
    }
    await this.repo.save(allDayReadings);
  }

  async deviceSimulatorUser5Id() {
    let hour = 0;
    const simulator = () => {
      const user = new User();
      user.id = 2;
      const newReading = new Reading();
      newReading.user = user;
      // newReading.timestamp = `01/12/2022 ${hour < 10 ? `0${hour}` : `${hour}`}:30:00`;
      newReading.temperature = Math.round(Math.random() * (55 - 45) + 45);
      newReading.pressure = Math.round(Math.random() * (55 - 45) + 45);
      newReading.flow = Math.round(Math.random() * (65 - 55) + 55);
      newReading.pH = +(Math.random() * (7.4 - 6.6) + 6.6).toFixed(1);
      hour++;
      console.log(hour);
      this.repo.save(newReading);
    };
    await setInterval(simulator, 5000);
  }

  // async edit(id: number, price: number) {
  //   const product = await this.repo.findOne(id);
  //   product.price = price;
  //   return this.repo.save(product);
  // }

  // async remove(id: number) {
  //   const product = await this.repo.findOne(id);
  //   this.repo.remove(product);
  // }
}
