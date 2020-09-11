import { client } from 'api/client';
import { RepoDetailsMock } from 'testUtilities/mocks/RepoDetailsMock';

import { RepoDetailsPageObject } from './RepoDetailsPageObject';

jest.spyOn(client, 'get');
(client.get as jest.Mock).mockResolvedValue({
  data: RepoDetailsMock,
});
afterEach(jest.clearAllMocks);

let page: RepoDetailsPageObject;

describe('Repo Details Page', () => {
  beforeEach(async () => {
    page = RepoDetailsPageObject.render(RepoDetailsMock.owner.login, RepoDetailsMock.name);
    await page.waitUntilLoaded();
  });

  it('shows basic repo details', () => {
    expect(page.name).toEqual('super-repo');
    expect(page.owner).toEqual('SuperOwner');
    expect(page.description).toEqual('Super description');
    expect(page.stars).toEqual(100);
    expect(page.createdAt).toEqual('created at 18/08/2015');
  });

  it('allows to go back', async () => {
    jest.spyOn(page.history, 'goBack');
    page.goBackHome();
    expect(page.history.goBack).toHaveBeenCalled();
  });
});
