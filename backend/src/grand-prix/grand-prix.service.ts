import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GrandPrix } from './grand-prix.entity';
import { Track } from '../tracks/track.entity';
import { Season } from '../seasons/season.entity';
import { ExternalApiService } from '../external-api/external-api.service';

@Injectable()
export class GrandPrixService {
  constructor(
    @InjectRepository(GrandPrix)
    private readonly gpRepo: Repository<GrandPrix>,
    @InjectRepository(Track)
    private readonly trackRepo: Repository<Track>,
    @InjectRepository(Season)
    private readonly seasonRepo: Repository<Season>,
    private readonly externalApi: ExternalApiService,
  ) {}

  async findAll() {
    return this.gpRepo.find({
      relations: ['season', 'track'],
      order: { round: 'ASC' },
    });
  }

  async findOne(id: number) {
    return this.gpRepo.findOne({
      where: { id },
      relations: ['season', 'track'],
    });
  }

  async findByYear(year: number) {
    return this.gpRepo.find({
      relations: ['season', 'track'],
      where: {
        season: { year },
      },
      order: { round: 'ASC' },
    });
  }

  async syncGrandsPrix() {
    const seasons = await this.seasonRepo.find();

    for (const season of seasons) {
      const existing = await this.gpRepo.count({
        where: { season: { id: season.id } },
      });

      if (existing > 0) {
        continue;
      }

      const res = await this.requestWithDelay(() =>
        this.externalApi.getByEndpoint(`${season.year}/races`),
      );

      const races = res.MRData.RaceTable.Races || [];

      for (const r of races) {
        const trackName = r.Circuit?.circuitName;
        if (!trackName) continue;

        const track = await this.trackRepo.findOne({
          where: { name: trackName },
        });
        if (!track) continue;

        let gp = await this.gpRepo.findOne({
          where: {
            name: r.raceName,
            season: { id: season.id },
          },
          relations: ['season'],
        });

        const startDate = r.FirstPractice
          ? new Date(r.FirstPractice.date)
          : new Date(r.date);

        const endDate = new Date(r.date);
        const round = Number(r.round);

        if (!gp) {
          gp = this.gpRepo.create({
            name: r.raceName,
            track,
            startDate,
            endDate,
            round,
            season,
          });
        } else {
          gp.track = track;
          gp.startDate = startDate;
          gp.endDate = endDate;
          gp.round = round;
        }

        await this.gpRepo.save(gp);
      }
    }

    return { message: 'ok' };
  }

  async requestWithDelay<T>(callback: () => Promise<T>) {
    await new Promise((r) => setTimeout(r, 2000));
    return callback();
  }
}
