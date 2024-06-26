import { Card, CardContent, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
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

const SalaryLogs = () => {
  const [salaryLogs, setSalaryLogs] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.post('/get_all_salary_logs');
        setSalaryLogs(data.arrList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(salaryLogs);
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Grid container spacing={2}>
          {salaryLogs.length > 0 &&
            salaryLogs.map((employee, index) => (
              <Grid item xs={12} key={index}>
                <Card className={classes.card}>
                  <Typography variant="h5" component="h2">
                    Username: {employee.objUser[0].strName}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Paid Date: {moment(employee.strCreatedTime).format(' MMMM Do YYYY, h:mm a')}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Amount: ${employee.intSalaryAmt}
                  </Typography>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}></Grid>
    </Grid>
  );
};

export default SalaryLogs;
