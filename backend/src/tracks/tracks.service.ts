import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './track.entity';
import { ExternalApiService } from '../external-api/external-api.service';
import { GrandPrix } from 'src/grand-prix/grand-prix.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepo: Repository<Track>,
    @InjectRepository(GrandPrix)
    private readonly gpRepo: Repository<GrandPrix>,
    private readonly externalApi: ExternalApiService,
  ) {}

  async findAll() {
    return this.trackRepo.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number) {
    return this.trackRepo.findOne({
      where: { id },
    });
  }

  async findBySeason(year: number) {
    const gps = await this.gpRepo.find({
      relations: ['track', 'season'],
      where: {
        season: { year },
      },
    });

    const unique = new Map<number, Track>();
    for (const gp of gps) {
      unique.set(gp.track.id, gp.track);
    }

    return [...unique.values()];
  }

  async syncTracks() {
    const tracks = await this.externalApi.getAll<any>(
      'circuits',
      30,
      'MRData.CircuitTable.Circuits',
    );

    for (const t of tracks) {
      let track = await this.trackRepo.findOne({
        where: { name: t.circuitName },
      });

      if (!track) {
        track = new Track();
        track.name = t.circuitName;
      }

      track.name = t.circuitName;
      track.location = t.Location.country + ', ' + t.Location.locality;
      track.lengthKm = Number(t.length) || 0;
      track.laps = Number(t.laps) || 0;
      track.turns = Number(t.turns) || 0;
      track.yearOpened = Number(t.yearOpened) || 0;

      await this.trackRepo.save(track);
    }

    return { message: 'ok' };
  }
}
