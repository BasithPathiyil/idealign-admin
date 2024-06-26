import { Card, Grid, Typography } from '@mui/material';
import React from 'react';

function BreadCrumbs({ title, ...props }) {
  return (
    <Grid item xs={12} md={12} {...props}>
      <Card sx={{ p: 2 }}>
        <Typography sx={{ color: 'black' }}>{title}</Typography>
      </Card>
    </Grid>
  );
}

export default BreadCrumbs;
