import React from 'react';
import { Container, Button, TextField } from '@material-ui/core';

import { RepoCard } from 'components/RepoCard';

import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  return (
    <Container className={styles.mainContainer}>
      <form>
        <TextField placeholder="Enter repository name" />
        <Button type="submit" variant="outlined" color="secondary">
          Search
        </Button>
      </form>
      <RepoCard />
    </Container>
  );
};
