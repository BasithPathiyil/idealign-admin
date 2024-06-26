import { Button, Grid } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import BreadCrumbs from 'ui-component/cards/BreadCrumbs';
import NewsEventsList from './NewsEventsList';

const NewsEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickAddProject = async () => {
    navigate('addnewsevents');
  };
  return (
    <Grid container spacing={2}>
      <BreadCrumbs title={'New & Events'} />
      <Grid item xs={12} md={12} display={'flex'} justifyContent={'flex-end'}>
        <Button variant="contained" onClick={handleClickAddProject}>
          {' '}
          + Add New
        </Button>
      </Grid>
      <Grid item xs={12} md={12}>
        <NewsEventsList />
      </Grid>
    </Grid>
  );
};

export default NewsEvents;
