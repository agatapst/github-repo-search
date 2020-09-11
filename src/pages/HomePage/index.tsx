import React, { useState, useEffect, FormEvent } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Button, TextField, CircularProgress, Typography, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { appConfig } from 'config/appConfig';
import { useGetRepos } from 'api/repos';
import { ReactComponent as MainSvg } from 'assets/developer.svg';
import { ReposList } from 'components/ReposList';

import styles from './HomePage.module.scss';

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

  const { data, error, isValidating } = useGetRepos(searchedQuery, page, appConfig.REPOS_PER_PAGE);

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
      {data && (
        <ReposList
          repos={data.items}
          totalCount={data.total_count}
          query={searchedQuery}
          page={page}
          perPage={appConfig.REPOS_PER_PAGE}
        />
      )}

      <Box>
        <MainSvg />
      </Box>
    </Box>
  );
};
