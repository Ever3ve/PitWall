import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ErgastService {
  private baseUrl = 'https://api.jolpi.ca/ergast/f1';

  async getDriversForYear(year: number) {
    const res = await axios.get(`${this.baseUrl}/${year}/drivers.json`);
    return res.data.MRData.DriverTable.Drivers;
  }
}
