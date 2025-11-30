import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Season } from './season.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeasonService {
  constructor(
    @InjectRepository(Season)
    private readonly repo: Repository<Season>,
  ) {}

  getAll() {
    return this.repo.find();
  }
}
