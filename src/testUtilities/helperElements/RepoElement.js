import { queryByTestId } from '@testing-library/react';

export class RepoElement {
  constructor(element) {
    this.element = element;
  }

  get name() {
    return queryByTestId(this.element, 'name').textContent;
  }

  get owner() {
    return queryByTestId(this.element, 'owner').textContent;
  }

  get description() {
    return queryByTestId(this.element, 'description').textContent;
  }

  get stars() {
    return parseInt(queryByTestId(this.element, 'stars').textContent);
  }

  get language() {
    return queryByTestId(this.element, 'language').textContent;
  }

  getInfo() {
    return {
      name: this.name,
      owner: this.owner,
      language: this.language,
      description: this.description,
      stars: this.stars,
    };
  }
}
