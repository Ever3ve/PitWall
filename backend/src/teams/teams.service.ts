import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { ExternalApiService } from 'src/external-api/external-api.service';

interface ExternalTeam {
  constructorId: string;
  name: string;
  nationality: string;
}

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamsRepo: Repository<Team>,
    private readonly externalApi: ExternalApiService,
  ) {}

  async syncTeams() {
    const teams = await this.externalApi.getAll<ExternalTeam>(
      'constructors',
      30,
      'MRData.ConstructorTable.Constructors',
    );

    for (const t of teams) {
      let team = await this.teamsRepo.findOne({
        where: { name: t.name },
      });

      if (!team) {
        team = new Team();
        team.name = t.name;
      }

      team.name = t.name;
      team.country = t.nationality;
      team.firstSeason = 0;
      team.lastSeason = 0;
      team.principal = '';

      await this.teamsRepo.save(team);
    }

    return { message: 'ok' };
  }
}
