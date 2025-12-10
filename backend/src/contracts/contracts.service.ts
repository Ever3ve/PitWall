import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { Driver } from '../drivers/driver.entity';
import { Team } from '../teams/team.entity';
import { ExternalApiService } from 'src/external-api/external-api.service';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepo: Repository<Contract>,
    @InjectRepository(Driver)
    private readonly driverRepo: Repository<Driver>,
    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,
    private readonly externalApi: ExternalApiService,
  ) {}

  async syncContracts() {
    const drivers = await this.driverRepo.find({ relations: ['contracts'] });

    const years = Array.from({ length: 2025 - 1950 + 1 }, (_, i) => 1950 + i);

    const standingsCache = new Map<number, any>();

    for (const year of years) {
      const res = await this.externalApi.getByEndpoint(
        `${year}/driverstandings`,
      );
      await new Promise((r) => setTimeout(r, 1000));

      const standings =
        res.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];

      standingsCache.set(year, standings);
    }

    for (const driver of drivers) {
      let lastTeam: Team | null = null;

      for (const year of years) {
        const standings = standingsCache.get(year);
        const ds = standings.find(
          (s: any) => s.Driver.driverId === driver.externalId,
        );

        if (!ds) continue;

        const teamName = ds.Constructors?.[0]?.name;
        if (!teamName) continue;

        const team = await this.teamRepo.findOne({ where: { name: teamName } });
        if (!team) continue;

        // first contract
        if (!lastTeam) {
          const contract = this.contractRepo.create({
            driver,
            team,
            started: new Date(year, 0, 1),
          });
          await this.contractRepo.save(contract);

          lastTeam = team;
        } else if (lastTeam.id !== team.id) {
          // close old
          const lastContract = driver.contracts.find(
            (c) => c.team.id === lastTeam!.id && !c.ended,
          );
          if (lastContract) {
            lastContract.ended = new Date(year - 1, 11, 31);
            await this.contractRepo.save(lastContract);
          }

          // create new
          const newContract = this.contractRepo.create({
            driver,
            team,
            started: new Date(year, 0, 1),
          });
          await this.contractRepo.save(newContract);

          lastTeam = team;
        }
      }
    }

    return { message: 'ok' };
  }
}
