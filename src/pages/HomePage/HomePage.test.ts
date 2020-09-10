import { client } from 'api/client';
import { ReposMock } from 'testUtilities/mocks/ReposMock';

import { HomePageObject } from './HomePageObject';

jest.spyOn(client, 'get');
(client.get as jest.Mock).mockResolvedValue({
  data: ReposMock,
});

afterEach(jest.clearAllMocks);

let page: HomePageObject;

describe('Home Page', () => {
  beforeEach(() => {
    page = HomePageObject.render();
  });

  it('shows search button and search input', () => {
    expect(page.searchButton).toBeInTheDocument();
    expect(page.searchInput).toBeInTheDocument();
  });

  it('shows list of repositories for the selected user', async () => {
    page.searchRepo('Repo 1');
    const reposList = await page.getReposList();
    expect(reposList.map((repoElement) => repoElement.getInfo())).toEqual([
      {
        name: 'Repo 1',
        owner: 'Owner 1',
        language: 'JS',
        stars: 10,
        description: 'Repo 1 created by Owner 1',
      },
      {
        name: 'Repo 2',
        owner: 'Owner 2',
        language: 'Ruby',
        stars: 20,
        description: 'Repo 2 created by Owner 2',
      },
    ]);
  });
});
