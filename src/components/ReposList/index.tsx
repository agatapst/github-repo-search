import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import { Pagination, PaginationItem, Alert } from '@material-ui/lab';
import { RepoCard } from 'components/RepoCard';
import { IRepository } from 'api/repos';

import styles from './ReposList.module.scss';

interface ReposListProps {
  repos: IRepository[];
  query: string | null;
  page: number;
  perPage: number;
  totalCount: number;
}

export const ReposList: React.FC<ReposListProps> = ({
  repos,
  query,
  page,
  perPage,
  totalCount,
}: ReposListProps) => {
  const totalPages = Math.ceil(totalCount / perPage);

  if (repos.length === 0) {
    return (
      <Alert severity="warning" className={styles.alert}>
        No repositories found
      </Alert>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h3">
        Results for query: {query} ({totalCount})
      </Typography>
      <ul className={styles.list} data-testid="repos-list">
        {repos.map((repo) => (
          <li key={repo.id} data-testid="repo">
            <RepoCard repo={repo} />
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          className={styles.pagination}
          renderItem={(item) => (
            <PaginationItem component={Link} to={`?q=${query}&page=${item.page}`} {...item} />
          )}
        />
      )}
    </Container>
  );
};
