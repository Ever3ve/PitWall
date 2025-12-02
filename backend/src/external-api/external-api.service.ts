import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExternalApiService {
  private BASE_URL = 'https://api.jolpi.ca/ergast/f1/2025';

  async getAll(endpoint: string) {
    const res = await axios.get(`${this.BASE_URL}/${endpoint}`);
    return res.data;
  }

  async getById(endpoint: string, id: string | number) {
    const res = await axios.get(`${this.BASE_URL}/${endpoint}/${id}`);
    return res.data;
  }
}
