import { Injectable } from '@nestjs/common';
import { fetchAll } from './fetch-all.util';
import axios from 'axios';

@Injectable()
export class ExternalApiService {
  private BASE_URL = 'https://api.jolpi.ca/ergast/f1/';

  async getAll<T>(
    endpoint: string,
    limit = 30,
    dataPath: string,
  ): Promise<T[]> {
    return fetchAll<T>(this.BASE_URL, endpoint, limit, dataPath);
  }

  async getById(endpoint: string, id: string | number) {
    const res = await axios.get(`${this.BASE_URL}/${endpoint}/${id}`);
    return res.data;
  }
}
