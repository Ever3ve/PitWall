import axios from 'axios';

export async function fetchAllFromErgast<T>(
  url: string,
  limit = 30,
  dataPath: string,
): Promise<T[]> {
  let offset = 0;
  let total = 0;
  let allItems: T[] = [];

  do {
    const res = await axios.get(url, { params: { limit, offset } });
    const data = dataPath
      .split('.')
      .reduce((acc, key) => acc[key], res.data) as T[];
    total = Number(res.data.MRData.total);
    allItems = allItems.concat(data);
    offset += limit;
  } while (offset < total);

  return allItems;
}
