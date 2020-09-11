import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, Box } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { IRepository } from 'api/repos';
import { routes } from 'config';
import StarIcon from '@material-ui/icons/Star';

import styles from './RepoCard.module.scss';

interface RepoCardProps {
  repo: IRepository;
}

export const RepoCard: React.FC<RepoCardProps> = ({
  repo: { name, owner, stargazers_count, language, description },
}: RepoCardProps) => {
  return (
    <Card variant="outlined" className={styles.repoCardContainer}>
      <CardContent>
        <Typography variant="h2" data-testid="name" className={styles.repoNameText}>
          {name}
        </Typography>
        <Typography variant="h3" component="p" data-testid="description">
          {description}
        </Typography>
        <Typography variant="body1" className={styles.loginOwnerText} data-testid="owner">
          created by {owner.login}
        </Typography>
        <Box className={styles.starsBox}>
          <Typography variant="body1" data-testid="stars">
            stars count: {stargazers_count}
          </Typography>
          <StarIcon />
        </Box>
        <Typography data-testid="language">main programming language: {language}</Typography>
      </CardContent>
      <CardActions className={styles.cardActionButton}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          component={RouterLink}
          to={routes.repo(owner.login, name)}
        >
          See More
        </Button>
      </CardActions>
    </Card>
  );
};
