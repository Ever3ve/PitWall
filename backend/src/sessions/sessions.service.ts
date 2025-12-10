import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Season } from '../seasons/season.entity';
import { GrandPrix } from '../grand-prix/grand-prix.entity';
import { Session, SessionType } from './session.entity';
import { ExternalApiService } from '../external-api/external-api.service';

@Injectable()
export class SessionService {
  private readonly sessionDurations = {
    [SessionType.FP1]: 60,
    [SessionType.FP2]: 60,
    [SessionType.FP3]: 60,
    [SessionType.QUALIFYING]: 60,
    [SessionType.SPRINT_SHOOTOUT]: 45,
    [SessionType.SPRINT]: 30,
    [SessionType.RACE]: 120,
  };
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
    @InjectRepository(GrandPrix)
    private readonly gpRepo: Repository<GrandPrix>,
    @InjectRepository(Season)
    private readonly seasonRepo: Repository<Season>,
    private readonly externalApi: ExternalApiService,
  ) {}

  async syncSessions() {
    const seasons = await this.seasonRepo.find();

    for (const season of seasons) {
      const res = await this.requestWithDelay(() =>
        this.externalApi.getByEndpoint(`${season.year}/races`),
      );

      const races = res.MRData?.RaceTable?.Races || [];

      for (const race of races) {
        const gp = await this.gpRepo.findOne({
          where: {
            name: race.raceName,
            season: { id: season.id },
          },
          relations: ['season'],
        });

        if (!gp) continue;

        const sessionsToSync = [
          { type: SessionType.FP1, data: race.FirstPractice },
          { type: SessionType.FP2, data: race.SecondPractice },
          { type: SessionType.FP3, data: race.ThirdPractice },
          { type: SessionType.QUALIFYING, data: race.Qualifying },
          { type: SessionType.SPRINT_SHOOTOUT, data: race.SprintQualifying },
          { type: SessionType.SPRINT, data: race.Sprint },
          {
            type: SessionType.RACE,
            data: { date: race.date, time: race.time },
          },
        ];

        for (const sessionInfo of sessionsToSync) {
          if (!sessionInfo.data || !sessionInfo.data.date) continue;

          await this.createOrUpdateSession(
            gp,
            sessionInfo.type,
            sessionInfo.data,
          );
        }
      }
    }

    return { message: 'ok' };
  }

  private async createOrUpdateSession(
    gp: GrandPrix,
    type: SessionType,
    sessionData: any,
  ) {
    let startTime = new Date('2100-01-01T00:00:00Z');
    let endTime = new Date('2100-01-01T00:00:00Z');

    if (sessionData?.date) {
      if (sessionData.time) {
        startTime = new Date(`${sessionData.date}T${sessionData.time}`);
      } else {
        startTime = new Date(sessionData.date);
      }

      if (startTime && !isNaN(startTime.getTime())) {
        const durationMinutes = this.sessionDurations[type];
        endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000);
      }
    }

    const existingSession = await this.sessionRepo.findOne({
      where: {
        grandPrix: { id: gp.id },
        type: type,
      },
      relations: ['grandPrix'],
    });

    if (existingSession) {
      const startTimeChanged =
        existingSession.startTime?.getTime() !== startTime?.getTime();
      const endTimeChanged =
        existingSession.endTime?.getTime() !== endTime?.getTime();

      if (startTimeChanged || endTimeChanged) {
        existingSession.startTime = startTime;
        existingSession.endTime = endTime;
        await this.sessionRepo.save(existingSession);
      }
    } else {
      const session = this.sessionRepo.create({
        type,
        startTime,
        endTime,
        grandPrix: gp,
      });
      await this.sessionRepo.save(session);
    }
  }

  private async requestWithDelay<T>(callback: () => Promise<T>) {
    await new Promise((r) => setTimeout(r, 3000));
    return callback();
  }
}
