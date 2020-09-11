import { ReposResponse } from 'api/repos';

export const ReposMock: ReposResponse = {
  total_count: 23,
  items: [
    {
      id: 1,
      name: 'Repo1',
      owner: {
        login: 'Owner1',
      },
      description: 'Repo 1 created by Owner 1',
      language: 'JS',
      stargazers_count: 10,
    },
    {
      id: 2,
      name: 'Repo2',
      owner: {
        login: 'Owner2',
      },
      description: 'Repo 2 created by Owner 2',
      language: 'Ruby',
      stargazers_count: 20,
    },
  ],
};
