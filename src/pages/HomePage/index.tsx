import React, { useState, FormEvent } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button, TextField, CircularProgress, Typography, Box, Container } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { RepoCard } from 'components/RepoCard';
import { getRepos, IRepository } from 'api/repos';
import { ReactComponent as MainSvg } from 'assets/developer.svg';

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
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={10}>
      <Typography variant="h1">Search Github Repository</Typography>

      <Box display="flex" flexDirection="column" mt={10}>
        <form onSubmit={handleSearch}>
          <TextField
            placeholder="Enter repository name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="outlined" color="secondary" fullWidth>
            Search
          </Button>
        </form>
      </Box>

      {error}
      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}
      {repos && !repos.length && <Typography variant="body1">No repositories found</Typography>}
      {repos && (
        <Container maxWidth="sm">
          <ul className={styles.reposList} data-testid="repos-list">
            {repos.map((repo) => (
              <li key={repo.id} data-testid="repo">
                <RepoCard repo={repo} />
              </li>
            ))}
          </ul>
          <Pagination
            count={10}
            page={page}
            className={styles.pagination}
            renderItem={(item) => (
              <PaginationItem component={Link} to={`?page=${item.page}`} {...item} />
            )}
          />
        </Container>
      )}

      <Box>
        <MainSvg />
      </Box>
    </Box>
  );
};
