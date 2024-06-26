import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import api from 'utils/api';

const Test = () => {
  // useEffect(() => {
  const fetchData = async () => {
    await api.post('/testapi');
  };
  //   fetchData();
  // }, []);
  return (
    <Grid>
      <Button onClick={fetchData}>Click</Button>
      <Typography>Hello</Typography>
    </Grid>
  );
};

export default Test;
