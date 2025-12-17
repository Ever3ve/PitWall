import { Injectable, NotFoundException } from '@nestjs/common';
import { Driver } from './driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExternalApiService } from 'src/external-api/external-api.service';
import { Season } from 'src/seasons/season.entity';
import { SessionType } from 'src/sessions/session.entity';

export interface ExternalDriver {
  driverId: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
  permanentNumber: string;
}

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepo: Repository<Driver>,
    @InjectRepository(Season)
    private readonly seasonRepo: Repository<Season>,
    private readonly externalApi: ExternalApiService,
  ) {}

  async getAll(): Promise<Driver[]> {
    return this.driverRepo.find({
      relations: ['firstGrandPrix', 'firstWinGrandPrix'],
    });
  }

  async getOne(id: number): Promise<Driver> {
    const driver = await this.driverRepo.findOne({
      where: { id },
      relations: ['firstGrandPrix', 'firstWinGrandPrix'],
    });
    if (!driver) throw new NotFoundException('Driver not found');
    return driver;
  }

  async syncDrivers() {
    const seasons = await this.seasonRepo.find();

    for (const season of seasons) {
      const drivers = await this.externalApi.requestWithDelay(() =>
        this.externalApi.getAll<ExternalDriver>(
          `${season.year}/drivers`,
          30,
          'MRData.DriverTable.Drivers',
        ),
      );

      for (const d of drivers) {
        let driver = await this.driverRepo.findOne({
          where: { externalId: d.driverId },
        });

        if (!driver) {
          driver = this.driverRepo.create({
            externalId: d.driverId,
            fansCount: 0,
            firstGrandPrix: null,
            firstWinGrandPrix: null,
          });
        }

        driver.name = d.givenName;
        driver.surname = d.familyName;
        driver.birthday = d.dateOfBirth ? new Date(d.dateOfBirth) : null;
        driver.country = d.nationality;
        driver.carNumber = d.permanentNumber ? Number(d.permanentNumber) : 0;

        await this.driverRepo.save(driver);
        await this.updateEmptyFirstGrandPrix();
      }
    }

    return { message: 'ok' };
  }

  async updateEmptyFirstGrandPrix() {
    const drivers = await this.driverRepo.find({
      relations: ['results', 'results.session', 'results.session.grandPrix'],
    });

    for (const driver of drivers) {
      const validResults = driver.results.filter(
        (r) => r.session?.grandPrix?.startDate,
      );

      if (!driver.firstGrandPrix) {
        const firstGP = validResults
          .map((r) => r.session.grandPrix)
          .sort(
            (a, b) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
          )[0];
        if (firstGP) driver.firstGrandPrix = firstGP;
      }

      if (!driver.firstWinGrandPrix) {
        const firstWinGP = validResults
          .filter(
            (r) => r.position === 1 && r.session.type === SessionType.RACE,
          )
          .map((r) => r.session.grandPrix)
          .sort(
            (a, b) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
          )[0];
        if (firstWinGP) driver.firstWinGrandPrix = firstWinGP;
      }

      await this.driverRepo.save(driver);
    }

    return { message: 'ok' };
  }
}
