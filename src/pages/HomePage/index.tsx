import React, { useState, useEffect, FormEvent } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { Button, TextField, CircularProgress, Typography, Box, Container } from '@material-ui/core';
import { Pagination, PaginationItem, Alert } from '@material-ui/lab';
import { RepoCard } from 'components/RepoCard';
import { useGetRepos } from 'api/repos';
import { ReactComponent as MainSvg } from 'assets/developer.svg';

import styles from './HomePage.module.scss';

const PER_PAGE = 10;

export const HomePage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const page = parseInt(params.get('page') || '1');
  const searchedQuery = params.get('q');

  // set initial query value from params
  useEffect(() => {
    if (searchedQuery) {
      setQuery(searchedQuery);
    }
  }, [searchedQuery, setQuery]);

  const { data, error, isValidating } = useGetRepos(searchedQuery, page, PER_PAGE);
  const repos = data?.items;
  const totalRepos = data?.total_count || 0;
  const totalPages = Math.ceil(totalRepos / PER_PAGE);

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    history.push(`?q=${query}`);
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

      {error && (
        <Alert severity="error" className={styles.alert}>
          {error}
        </Alert>
      )}
      {isValidating && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress data-testid="loader" />
        </Box>
      )}
      {repos && !repos.length && (
        <Alert severity="warning" className={styles.alert}>
          No repositories found
        </Alert>
      )}
      {repos && (
        <Container maxWidth="sm">
          <ul className={styles.reposList} data-testid="repos-list">
            {repos.map((repo) => (
              <li key={repo.id} data-testid="repo">
                <RepoCard repo={repo} />
              </li>
            ))}
          </ul>
          {totalPages && (
            <Pagination
              count={totalPages}
              page={page}
              className={styles.pagination}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`?q=${searchedQuery}&page=${item.page}`}
                  {...item}
                />
              )}
            />
          )}
        </Container>
      )}

      <Box>
        <MainSvg />
      </Box>
    </Box>
  );
};
