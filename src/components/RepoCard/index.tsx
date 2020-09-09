import React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { IRepository } from 'api/repos';

interface RepoCardProps {
  repo: IRepository;
}

export const RepoCard: React.FC<RepoCardProps> = ({
  repo: { name, owner, stargazers_count, language, description },
}: RepoCardProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h1" data-testid="name">
          {name}
        </Typography>
        <Typography variant="h2" data-testid="owner">
          {owner.login}
        </Typography>
        <Typography data-testid="stars">{stargazers_count}</Typography>
        <Typography data-testid="language">{language}</Typography>
        <Typography variant="body1" component="p" data-testid="description">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary">
          See more
        </Button>
      </CardActions>
    </Card>
  );
};
