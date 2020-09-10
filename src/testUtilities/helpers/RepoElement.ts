import { getByTestId } from '@testing-library/react';

interface RepoInfo {
  name: string | null;
  owner: string | null;
  language: string | null;
  description: string | null;
  stars: number;
}

export class RepoElement {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  get name(): string | null {
    return getByTestId(this.element, 'name').textContent;
  }

  get owner(): string | null {
    return getByTestId(this.element, 'owner').textContent;
  }

  get description(): string | null {
    return getByTestId(this.element, 'description').textContent;
  }

  get stars(): number {
    return parseInt(getByTestId(this.element, 'stars').textContent || '0');
  }

  get language(): string | null {
    return getByTestId(this.element, 'language').textContent;
  }

  getInfo(): RepoInfo {
    return {
      name: this.name,
      owner: this.owner,
      language: this.language,
      description: this.description,
      stars: this.stars,
    };
  }
}
