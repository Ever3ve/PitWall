import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly drivers: Repository<Driver>,
  ) {}

  getAll() {
    return this.drivers.find();
  }

  async create(dto: Partial<Driver>) {
    const d = this.drivers.create(dto);
    return this.drivers.save(d);
  }
}
