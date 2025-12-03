import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './track.entity';
import { ExternalApiService } from '../external-api/external-api.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepo: Repository<Track>,
    private readonly externalApi: ExternalApiService,
  ) {}

  async syncTracks() {
    const tracks = await this.externalApi.getAll<any>(
      'circuits',
      30,
      'MRData.CircuitTable.Circuits',
    );

    let syncedCount = 0;

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
