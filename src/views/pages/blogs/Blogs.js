import { Button, Grid } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import BreadCrumbs from 'ui-component/cards/BreadCrumbs';
import BlogsList from './BlogsList';

const Blogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickAddProject = async () => {
    navigate('addblog');
  };
  return (
    <Grid container spacing={2}>
      <BreadCrumbs title={'Blogs'} />
      <Grid item xs={12} md={12} display={'flex'} justifyContent={'flex-end'}>
        <Button variant="contained" onClick={handleClickAddProject}>
          {' '}
          + Add Blog
        </Button>
      </Grid>
      <Grid item xs={12} md={12}>
        <BlogsList />
      </Grid>
    </Grid>
  );
};

export default Blogs;
