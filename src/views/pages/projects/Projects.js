import { Button, Grid } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import BreadCrumbs from 'ui-component/cards/BreadCrumbs';
import ProjectsList from './ProjectsList';

const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickAddProject = async () => {
    navigate('addproject');
  };
  return (
    <Grid container spacing={2}>
      <BreadCrumbs title={'Projects'} />
      <Grid item xs={12} md={12} display={'flex'} justifyContent={'flex-end'}>
        <Button variant="contained" onClick={handleClickAddProject}>
          {' '}
          + Add Project
        </Button>
      </Grid>
      <Grid item xs={12} md={12}>
        <ProjectsList />
      </Grid>
    </Grid>
  );
};

export default Projects;
