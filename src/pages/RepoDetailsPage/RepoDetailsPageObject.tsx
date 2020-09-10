import React from 'react';
import { waitForElementToBeRemoved, getByTestId, queryByTestId } from '@testing-library/react';
import { renderWithProviders } from 'testUtilities/helpers';

import { RepoDetailsPage } from '.';

export class RepoDetailsPageObject {
  container: HTMLElement;

  static async render(owner: string, name: string): Promise<RepoDetailsPageObject> {
    const { container } = renderWithProviders(<RepoDetailsPage />, `/repos/${owner}/${name}`);
    await waitForElementToBeRemoved(() => queryByTestId(container, 'loader'));
    return new RepoDetailsPageObject(container);
  }

  constructor(container: HTMLElement) {
    this.container = container;
  }

  get name(): string | null {
    return getByTestId(this.container, 'name').textContent;
  }

  get owner(): string | null {
    return getByTestId(this.container, 'owner').textContent;
  }

  get description(): string | null {
    return getByTestId(this.container, 'description').textContent;
  }

  get stars(): number {
    return parseInt(getByTestId(this.container, 'stars').textContent || '0');
  }

  get createdAt(): string | null {
    return getByTestId(this.container, 'createdAt').textContent;
  }
}
