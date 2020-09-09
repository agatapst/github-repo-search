import React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';

export const RepoCard: React.FC = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h1">Repo name</Typography>
        <Typography variant="h2">Repo owner</Typography>
        <Typography>Number of stars</Typography>
        <Typography>Language</Typography>
        <Typography variant="body1" component="p">
          Description
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
