import React from 'react';
import {
  fireEvent,
  waitForElementToBeRemoved,
  getByTestId,
  queryByTestId,
  getByText,
} from '@testing-library/react';
import { renderWithProviders } from 'testUtilities/helpers';
import { MemoryHistory } from 'history';

import { RepoDetailsPage } from '.';

export class RepoDetailsPageObject {
  container: HTMLElement;
  history: MemoryHistory;

  static render(owner: string, name: string): RepoDetailsPageObject {
    const { container, history } = renderWithProviders(
      <RepoDetailsPage />,
      `/repos/${owner}/${name}`
    );
    return new RepoDetailsPageObject(container, history);
  }

  constructor(container: HTMLElement, history: MemoryHistory) {
    this.container = container;
    this.history = history;
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

  goBackHome(): void {
    const button = getByText(this.container, /go back home/i);
    fireEvent.click(button);
  }

  async waitUntilLoaded(): Promise<void> {
    if (queryByTestId(this.container, 'loader')) {
      await waitForElementToBeRemoved(() => queryByTestId(this.container, 'loader'));
    }
  }
}
