import { InjectRepository } from '@nestjs/typeorm';
import { SessionResult } from './session-result.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionResultsService {
  constructor(
    @InjectRepository(SessionResult)
    private readonly repo: Repository<SessionResult>,
  ) {}

  getAll() {
    return this.repo.find();
  }
}
