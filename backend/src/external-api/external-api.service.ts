import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';

@Injectable()
export class ExternalApiService {
  private BASE_URL = 'https://api.jolpi.ca/ergast/f1/2025';

  async getDrivers() {
    const res = await axios.get(`${this.BASE_URL}/drivers`);
    return res.data;
  }

  async getConstructors() {
    const res = await axios.get(`${this.BASE_URL}/constructors`);
    return res.data;
  }

  async getRaces() {
    const res = await axios.get(`${this.BASE_URL}/races`);
    return res.data;
  }
}
