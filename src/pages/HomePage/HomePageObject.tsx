import React from 'react';
import {
  getByText,
  getByPlaceholderText,
  fireEvent,
  findByTestId,
  findAllByTestId,
} from '@testing-library/react';
import { renderWithProviders, RepoElement } from 'testUtilities/helpers';

import { HomePage } from '.';

export class HomePageObject {
  container: HTMLElement;

  static render(): HomePageObject {
    const { container } = renderWithProviders(<HomePage />);
    return new HomePageObject(container);
  }

  constructor(container: HTMLElement) {
    this.container = container;
  }

  get searchButton(): HTMLElement {
    return getByText(this.container, 'Search');
  }

  get searchInput(): HTMLElement {
    return getByPlaceholderText(this.container, 'Enter repository name');
  }

  searchRepo(repoName: string): void {
    fireEvent.change(this.searchInput, { target: { value: repoName } });
    fireEvent.click(this.searchButton);
  }

  async getReposList(): Promise<RepoElement[]> {
    const list = await findByTestId(this.container, 'repos-list');
    const repos = await findAllByTestId(list, 'repo');
    return [...repos].map((repo) => new RepoElement(repo));
  }
}
