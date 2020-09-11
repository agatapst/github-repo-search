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

  describe('with searched repositories', () => {
    beforeEach(async () => {
      await page.searchRepo('Repo1');
    });

    it('shows list of repositories', () => {
      expect(page.location.search).toEqual('?q=Repo1');
      const reposList = page.reposList;
      expect(reposList.map((repoElement) => repoElement.getInfo())).toEqual([
        {
          name: 'Repo1',
          owner: 'Owner1',
          language: 'main programming language: JS',
          stars: 'stars count: 10',
          description: 'Repo 1 created by Owner 1',
        },
        {
          name: 'Repo2',
          owner: 'Owner2',
          language: 'main programming language: Ruby',
          stars: 'stars count: 20',
          description: 'Repo 2 created by Owner 2',
        },
      ]);
    });

    it('shows pagination', async () => {
      expect(page.pagination).toBeInTheDocument();
      await page.goToPage(3);
      expect(page.location.search).toEqual('?q=Repo1&page=3');
    });

    it('redirects to repo details page after clicking See more', () => {
      page.reposList[0].clickSeeMore();
      expect(page.location.pathname).toEqual('/repos/Owner1/Repo1');
    });
  });
});
