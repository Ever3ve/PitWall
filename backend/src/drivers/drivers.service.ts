import { Injectable } from '@nestjs/common';
import { Driver } from './driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExternalApiService } from 'src/external-api/external-api.service';

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
    private readonly externalApi: ExternalApiService,
  ) {}

  async syncDrivers() {
    const drivers = await this.externalApi.getAll<ExternalDriver>(
      '2025/drivers',
      30,
      'MRData.DriverTable.Drivers',
    );

    for (const d of drivers) {
      const existing = await this.driverRepo.findOne({
        where: { externalId: d.driverId },
      });

      const driver = existing ?? new Driver();

      driver.externalId = d.driverId;
      driver.name = d.givenName;
      driver.surname = d.familyName;
      driver.birthday = d.dateOfBirth ? new Date(d.dateOfBirth) : null;
      driver.country = d.nationality;
      driver.carNumber = d.permanentNumber ? Number(d.permanentNumber) : 0;

      if (!existing) {
        driver.fansCount = 0;
        driver.firstRace = '';
        driver.firstWin = '';
      }

      await this.driverRepo.save(driver);
    }

    return { message: 'ok' };
  }
}
