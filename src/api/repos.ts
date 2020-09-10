import useSWR, { responseInterface } from 'swr';

import { client } from './client';

export interface IRepository {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url?: string;
  };
  description: string;
  language: string;
  stargazers_count: number;
  created_at?: string;
}

interface ReposResponse {
  items: IRepository[];
}

export const getRepos = async (query: string): Promise<IRepository[]> => {
  const response = await client.get<ReposResponse>('/search/repositories', {
    params: { q: query },
  });
  return response.data.items;
};

const getRepoDetails = async (url: string): Promise<IRepository> => {
  const response = await client.get(url);
  return response.data;
};

export const useGetRepoDetails = (
  owner: string,
  name: string
): responseInterface<IRepository, Error> => useSWR(`/repos/${owner}/${name}`, getRepoDetails);
