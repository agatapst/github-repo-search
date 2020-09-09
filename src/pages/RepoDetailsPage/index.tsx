import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box } from '@material-ui/core';
import { useGetRepoDetails } from 'api/repos';

export const RepoDetailsPage: React.FC = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const { data } = useGetRepoDetails(owner, name);

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" flexDirection="row">
        <Box>USER INFO: {data?.owner?.login}</Box>
        <Box>REPO DETAILS</Box>
      </Box>
    </Container>
  );
};
