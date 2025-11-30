import { Repository } from 'typeorm';
import { GrandPrix } from './grand-prix.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GrandPrixService {
  constructor(
    @InjectRepository(GrandPrix)
    private readonly repo: Repository<GrandPrix>,
  ) {}

  getAll() {
    return this.repo.find();
  }
}
