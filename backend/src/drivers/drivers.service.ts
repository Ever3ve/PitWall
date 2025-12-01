import { Injectable } from '@nestjs/common';
import { Driver } from './driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExternalApiService } from 'src/external-api/external-api.service';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepo: Repository<Driver>,
    private readonly externalApi: ExternalApiService,
  ) {}

  async syncDrivers() {
    const data = await this.externalApi.getDrivers();
    const drivers = data.MRData.DriverTable.Drivers;

    for (const d of drivers) {
      let driver = await this.driverRepo.findOne({
        where: { externalId: d.driverId },
      });

      if (!driver) {
        driver = new Driver();
        driver.externalId = d.driverId;
        driver.name = d.givenName;
        driver.surname = d.familyName;
        driver.birthday = new Date(d.dateOfBirth);
        driver.country = d.nationality;
        driver.carNumber = Number(d.permanentNumber);
        driver.fansCount = 0;
        driver.firstRace = '';
        driver.firstWin = '';

        await this.driverRepo.save(driver);
      } else {
        driver.name = d.givenName;
        driver.surname = d.familyName;
        driver.birthday = new Date(d.dateOfBirth);
        driver.country = d.nationality;
        driver.carNumber = Number(d.permanentNumber);

        await this.driverRepo.save(driver);
      }
    }

    return { message: 'ok' };
  }
}
