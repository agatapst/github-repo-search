import React, { useState, FormEvent } from 'react';
import { Container, Button, TextField } from '@material-ui/core';
import { RepoCard } from 'components/RepoCard';
import { getRepos, IRepository } from 'api/repos';

import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [repos, setRepos] = useState<IRepository[]>([]);
  const [error, setError] = useState<string>('');

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (query) {
      try {
        const result = await getRepos(query);
        setRepos(result);
      } catch (error) {
        console.error(error);
        setError('Something went wrong');
      }
    }
  };

  return (
    <Container className={styles.mainContainer}>
      <form onSubmit={handleSearch}>
        <TextField
          placeholder="Enter repository name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" variant="outlined" color="secondary">
          Search
        </Button>
      </form>
      {error}
      <ul data-testid="repos-list">
        {repos.map((repo) => (
          <li key={repo.id} data-testid="repo">
            <RepoCard repo={repo} />
          </li>
        ))}
      </ul>
    </Container>
  );
};
