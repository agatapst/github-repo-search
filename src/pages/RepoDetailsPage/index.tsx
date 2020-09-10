import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { useGetRepoDetails } from 'api/repos';
import { formatDate } from 'helpers/formatDate';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StarIcon from '@material-ui/icons/Star';

export const RepoDetailsPage: React.FC = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const { data, isValidating } = useGetRepoDetails(owner, name);

  return (
    <Container maxWidth="sm">
      <Button component={RouterLink} to="/">
        <ArrowBackIcon /> Go back home
      </Button>

      <Card>
        <CardContent>
          {isValidating && <CircularProgress data-testid="loader" />}
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row">
              <Typography variant="h1" data-testid="name">
                {data?.name}
              </Typography>
              <StarIcon />
              <span data-testid="stars">{data?.stargazers_count}</span>
            </Box>
            <Box>
              <Typography variant="body1" data-testid="description">
                {data?.description}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography variant="body1">created by </Typography>
              <Typography variant="h3" data-testid="owner">
                {data?.owner?.login}
              </Typography>
              <Avatar alt="User avatar" src={data?.owner?.avatar_url} />
            </Box>
            <Box>
              <Typography variant="body1" data-testid="createdAt">
                created at {formatDate(data?.created_at)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
