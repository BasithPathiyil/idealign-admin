import { Card, CardContent, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import CustomPagination from 'ui-component/CustomPagination';
import api from 'utils/api';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  card: {
    minWidth: 275,
    padding: 20
  }
});

const AchievedMilestonesList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [chrStatus, setChrStatus] = useState('active');
  const [activeAchievedMilestones, setActiveAchievedMilestones] = useState([]);
  const [docCounts, setDocCounts] = useState(0);
  const classes = useStyles();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.post('/get_achieved_milestone', { strActiveStatus: chrStatus, page: page, limit: limit });
        console.log('data', data);
        setActiveAchievedMilestones(data.arrList);

        setDocCounts(data?.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page, limit, chrStatus]);
  const handleChange = (event, newAlignment) => {
    setChrStatus(newAlignment);
  };
  console.log('countDoc', docCounts);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: '16px' }}>
          <Typography variant="h3">Milestone Achieved Users</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container>
          <ToggleButtonGroup color="primary" value={chrStatus} exclusive onChange={handleChange} aria-label="Platform">
            <ToggleButton value="active">Current</ToggleButton>
            <ToggleButton value="inactive">Previous</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={2}>
          {activeAchievedMilestones.length > 0 &&
            activeAchievedMilestones.map((employee, index) => (
              <Grid item xs={12} key={index}>
                <Card className={classes.card}>
                  <Typography variant="h5" component="h2">
                    Username: {employee.objUser[0].strName}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Achieved Date: {moment(employee.strAchievedDate).format(' MMMM Do YYYY, h:mm a')}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Milestone Plan: ${employee.objMilestone[0].strName}
                  </Typography>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}></Grid>
      <CustomPagination count={docCounts} page={page} rowsPerPage={limit} setRowsPerPage={setLimit} onPageChange={setPage} />
    </Grid>
  );
};

export default AchievedMilestonesList;
