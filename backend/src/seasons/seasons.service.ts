import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Season } from './season.entity';
import { ExternalApiService } from '../external-api/external-api.service';

@Injectable()
export class SeasonService {
  constructor(
    @InjectRepository(Season)
    private readonly seasonRepo: Repository<Season>,
    private readonly externalApi: ExternalApiService,
  ) {}

  async findAll() {
    return this.seasonRepo.find({
      order: { year: 'DESC' },
    });
  }

  async findOne(year: number) {
    return this.seasonRepo.findOne({
      where: { year },
    });
  }

  async syncSeasons() {
    const seasons = await this.externalApi.getAll<{ season: string }>(
      'seasons',
      30,
      'MRData.SeasonTable.Seasons',
    );

    for (const s of seasons) {
      const year = Number(s.season);

      const existing = await this.seasonRepo.findOne({
        where: { year },
      });

      if (!existing) {
        const season = new Season();
        season.year = year;
        await this.seasonRepo.save(season);
      }
    }

    return { message: 'ok' };
  }
}
