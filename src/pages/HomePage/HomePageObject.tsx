import React from 'react';
import {
  getByText,
  getByPlaceholderText,
  fireEvent,
  getByTestId,
  getAllByTestId,
  getByLabelText,
  waitForElementToBeRemoved,
  queryByTestId,
} from '@testing-library/react';
import { MemoryHistory, Location } from 'history';
import { renderWithProviders, RepoElement } from 'testUtilities/helpers';

import { HomePage } from '.';

export class HomePageObject {
  container: HTMLElement;
  history: MemoryHistory;

  static render(): HomePageObject {
    const { container, history } = renderWithProviders(<HomePage />);
    return new HomePageObject(container, history);
  }

  constructor(container: HTMLElement, history: MemoryHistory) {
    this.container = container;
    this.history = history;
  }

  get searchButton(): HTMLElement {
    return getByText(this.container, 'Search');
  }

  get searchInput(): HTMLElement {
    return getByPlaceholderText(this.container, 'Enter repository name');
  }

  get pagination(): HTMLElement {
    return getByLabelText(this.container, /pagination/);
  }

  get location(): Location {
    return this.history.location;
  }

  get reposList(): RepoElement[] {
    const list = getByTestId(this.container, 'repos-list');
    const repos = getAllByTestId(list, 'repo');
    return [...repos].map((repo) => new RepoElement(repo));
  }

  async searchRepo(repoName: string): Promise<void> {
    fireEvent.change(this.searchInput, { target: { value: repoName } });
    fireEvent.click(this.searchButton);
    await this.waitUntilLoaded();
  }

  async goToPage(page: number): Promise<void> {
    const button = getByLabelText(this.pagination, `Go to page ${page}`);
    fireEvent.click(button);
    await this.waitUntilLoaded();
  }

  async waitUntilLoaded(): Promise<void> {
    if (queryByTestId(this.container, 'loader')) {
      await waitForElementToBeRemoved(() => queryByTestId(this.container, 'loader'));
    }
  }
}
