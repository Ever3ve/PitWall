import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Season } from './season.entity';
import { fetchAllFromErgast } from '../external-api/fetch-all.util';

@Injectable()
export class SeasonService {
  constructor(
    @InjectRepository(Season)
    private readonly seasonRepo: Repository<Season>,
  ) {}

  async syncSeasons() {
    const allSeasons = await fetchAllFromErgast<{ season: string }>(
      'https://api.jolpi.ca/ergast/f1/seasons',
      30,
      'MRData.SeasonTable.Seasons',
    );

    let syncedCount = 0;

    for (const s of allSeasons) {
      const year = Number(s.season);

      let season = await this.seasonRepo.findOne({ where: { year } });
      if (!season) {
        season = new Season();
        season.year = year;
        await this.seasonRepo.save(season);
        syncedCount++;
      }
    }

    return { message: 'ok' };
  }
}
