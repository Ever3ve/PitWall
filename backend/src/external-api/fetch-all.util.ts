import axios from 'axios';

export async function fetchAll<T>(
  baseUrl: string,
  endpoint: string,
  limit: number,
  dataPath: string,
): Promise<T[]> {
  let offset = 0;
  let total = 0;
  let allItems: T[] = [];

  do {
    const res = await axios.get(`${baseUrl}/${endpoint}`, {
      params: { limit, offset },
    });

    const data = dataPath
      .split('.')
      .reduce((acc, key) => acc[key], res.data) as T[];

    total = Number(res.data.MRData.total);
    allItems.push(...data);
    offset += limit;
  } while (offset < total);

  return allItems;
}
