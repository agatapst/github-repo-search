import { client } from './client';

export interface IRepository {
  id: number;
  name: string;
  owner: {
    login: string;
  };
  description: string;
  language: string;
  stargazers_count: number;
}

interface ReposResponse {
  items: IRepository[];
}

export const getRepos = async (url: string, query: string): Promise<IRepository[]> => {
  const response = await client.get<ReposResponse>(url, {
    params: { q: query },
  });
  return response.data.items;
};
