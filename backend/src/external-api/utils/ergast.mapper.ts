import { Driver } from '../../drivers/driver.entity';

export class ErgastMapper {
  static toDriverEntity(ergastDriver: any): Partial<Driver> {
    return {
      name: ergastDriver.givenName,
      surname: ergastDriver.familyName,
      birthday: ergastDriver.dateOfBirth,
      country: ergastDriver.nationality,
      carNumber: ergastDriver.permanentNumber ?? undefined,
    };
  }
}
