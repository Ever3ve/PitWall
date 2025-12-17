import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionResult } from './session-result.entity';
import { Session, SessionType } from '../sessions/session.entity';
import { Driver } from '../drivers/driver.entity';
import { ExternalApiService } from '../external-api/external-api.service';

@Injectable()
export class SessionResultsService {
  constructor(
    @InjectRepository(SessionResult)
    private readonly repo: Repository<SessionResult>,
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
    @InjectRepository(Driver)
    private readonly driverRepo: Repository<Driver>,
    private readonly externalApi: ExternalApiService,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['driver', 'session'],
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['driver', 'session'],
    });
  }

  async findBySession(sessionId: number) {
    return this.repo.find({
      where: {
        session: { id: sessionId },
      },
      relations: ['session', 'driver'],
      order: {
        position: 'ASC',
      },
    });
  }

  async syncSessionResults(year: number) {
    const sessions = await this.sessionRepo.find({
      relations: ['grandPrix', 'grandPrix.season'],
      where: { grandPrix: { season: { year } } },
    });

    for (const session of sessions) {
      let endpoint: string;

      switch (session.type) {
        case SessionType.RACE:
          endpoint = `${year}/${session.grandPrix.round}/results`;
          break;
        case SessionType.SPRINT:
          endpoint = `${year}/${session.grandPrix.round}/sprint`;
          break;
        case SessionType.QUALIFYING:
          endpoint = `${year}/${session.grandPrix.round}/qualifying`;
          break;
        default:
          continue;
      }

      const races = await this.externalApi.requestWithDelay(() =>
        this.externalApi.getAll(endpoint, 30, 'MRData.RaceTable.Races'),
      );

      if (!races || !Array.isArray(races)) continue;

      const resultsArray: any[] = [];
      for (const race of races as any[]) {
        switch (session.type) {
          case SessionType.RACE:
            resultsArray.push(...(race.Results ?? []));
            break;
          case SessionType.SPRINT:
            resultsArray.push(...(race.SprintResults ?? []));
            break;
          case SessionType.QUALIFYING:
            resultsArray.push(...(race.QualifyingResults ?? []));
            break;
        }
      }

      for (const r of resultsArray) {
        const ergastDriverId = r.Driver.driverId;

        const driver = await this.driverRepo.findOne({
          where: { externalId: ergastDriverId },
        });
        if (!driver) continue;

        await this.saveResult(session, driver, r);
      }
    }

    return { message: `Session results for ${year} synced` };
  }

  private async saveResult(session: Session, driver: Driver, r: any) {
    const existing = await this.repo.findOne({
      where: { session: { id: session.id }, driver: { id: driver.id } },
      relations: ['session', 'driver'],
    });

    const points = r.points ? Number(r.points) : 0;
    const position = r.position ? Number(r.position) : 0;
    const fastestLap =
      session.type === SessionType.QUALIFYING
        ? (r.Q3 ?? r.Q2 ?? r.Q1 ?? null)
        : (r.FastestLap?.Time?.time ?? null);

    if (existing) {
      existing.points = points;
      existing.position = position;
      existing.fastestLap = fastestLap;
      await this.repo.save(existing);
    } else {
      const result = this.repo.create({
        session,
        driver,
        points,
        position,
        fastestLap,
      });
      await this.repo.save(result);
    }
  }
}
