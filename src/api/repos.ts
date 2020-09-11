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

export interface ReposResponse {
  items: IRepository[];
  total_count: number;
}

export const getRepos = async (
  url: string,
  q: string,
  page: number,
  per_page: number
): Promise<ReposResponse> => {
  const response = await client.get<ReposResponse>(url, {
    params: { q, page, per_page },
  });
  return response.data;
};

export const useGetRepos = (
  query: string | null,
  page: number,
  perPage: number
): responseInterface<ReposResponse, Error> =>
  // if there is no query pass null as SWR key to prevent calling API
  useSWR(query && ['/search/repositories', query, page, perPage], getRepos);

const getRepoDetails = async (url: string): Promise<IRepository> => {
  const response = await client.get(url);
  return response.data;
};

export const useGetRepoDetails = (
  owner: string,
  name: string
): responseInterface<IRepository, Error> => useSWR(`/repos/${owner}/${name}`, getRepoDetails);
