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
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StarIcon from '@material-ui/icons/Star';

import styles from './RepoDetailsPage.module.scss';

export const RepoDetailsPage: React.FC = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const { data, isValidating } = useGetRepoDetails(owner, name);

  const history = useHistory();

  return (
    <>
      <Button onClick={() => history.goBack()}>
        <ArrowBackIcon /> Go back home
      </Button>

      <Container maxWidth="sm">
        <Card className={styles.repoDetailsCard}>
          <CardContent>
            {isValidating && <CircularProgress data-testid="loader" />}
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row">
                <Typography variant="h1" data-testid="name">
                  {data?.name}
                </Typography>
                <Typography variant="body1" data-testid="stars">
                  {data?.stargazers_count}
                </Typography>
                <StarIcon />
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar alt="User avatar" src={data?.owner?.avatar_url} />
                <Typography variant="h3" data-testid="owner">
                  {data?.owner?.login}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" data-testid="description">
                  {data?.description}
                </Typography>
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
    </>
  );
};
