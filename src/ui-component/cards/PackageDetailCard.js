import { Card, Grid, Typography } from '@mui/material';
import React from 'react';

const PackageDetailCard = ({ packageData }) => {
  return (
    <Card variant="outlined" sx={{ padding: '16px' }}>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Grid container>
            <Grid item xs={6} md={6}>
              <Typography>Monday</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>{packageData.intMonAmt}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid container>
            <Grid item xs={6} md={6}>
              Tuesday
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>{packageData.intTueAmt}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid container>
            <Grid item xs={6} md={6}>
              Wednesday
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>{packageData.intWebAmt}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid container>
            <Grid item xs={6} md={6}>
              Thursday
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>{packageData.intThuAmt}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid container>
            <Grid item xs={6} md={6}>
              Friday
            </Grid>
            <Grid item xs={6} md={6}>
              {' '}
              <Typography>{packageData.intFriAmt}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PackageDetailCard;
