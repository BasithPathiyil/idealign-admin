import React from 'react';
import { Drawer, Grid, Typography } from '@mui/material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: '35%'
    },
    width: '100%'
  }
}));

const CustomDrawer = ({ open, onClose, title, children }) => {
  const classes = useStyles();
  return (
    <Drawer anchor="right" open={open} onClose={onClose} classes={{ paper: classes.drawer }}>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Grid container sx={{ backgroundColor: '#EBEBEB', p: 2, width: '100%' }}>
            <Grid item xs={6} md={6}>
              <Typography variant="h4">{title}</Typography>
            </Grid>
            <Grid item xs={6} md={6} container justifyContent={'flex-end'}>
              <DisabledByDefaultIcon sx={{ cursor: 'pointer' }} onClick={() => onClose()} color="error" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          {children}
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default CustomDrawer;
