import React, { useState, FormEvent } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Button, TextField, CircularProgress } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { RepoCard } from 'components/RepoCard';
import { getRepos, IRepository } from 'api/repos';

import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [repos, setRepos] = useState<IRepository[] | null>(null);
  const [error, setError] = useState<string>('');

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const page = parseInt(params.get('page') || '1');

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    if (query) {
      try {
        const result = await getRepos(query);
        setRepos(result);
      } catch (error) {
        console.error(error);
        setError('Something went wrong');
      }
      setLoading(false);
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
      {loading && <CircularProgress />}
      {repos && !repos.length && <p>No repositories found</p>}
      {repos && (
        <>
          <ul data-testid="repos-list">
            {repos.map((repo) => (
              <li key={repo.id} data-testid="repo">
                <RepoCard repo={repo} />
              </li>
            ))}
          </ul>
          <Pagination
            count={10}
            page={page}
            renderItem={(item) => (
              <PaginationItem component={Link} to={`?page=${item.page}`} {...item} />
            )}
          />
        </>
      )}
    </Container>
  );
};
