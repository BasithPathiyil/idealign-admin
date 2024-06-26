import { Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings, updateSettings } from 'store/settings/actions';

const ManageFees = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSettings({ strType: 'settings', type: 'commonList' }));
  }, []);
  const { settingsValues } = useSelector((state) => state?.settings);
  const [subscriptionFee, setSubscriptionFee] = useState(0);
  const [allWithdrawPerc, setAllWithdrawPerc] = useState(0);
  const [capitalWithdrawPercIn6month, setCapitalWithdrawPercIn6month] = useState(0);
  const [minWithdrawAmtWallet, setMinWithdrawAmtWallet] = useState(0);
  const [referalIncome3LevelsLimit, setReferalIncome3LevelsLimit] = useState(0);
  const [referalIncome5LevelsLimit, setReferalIncome5LevelsLimit] = useState(0);
  const [referalIncome7LevelsLimit, setReferalIncome7LevelsLimit] = useState(0);
  const [teampoolPercValue, setTeamPoolPercValue] = useState(0);
  useEffect(() => {
    setSubscriptionFee(settingsValues[0]?.intPercentage);
    setAllWithdrawPerc(settingsValues[1]?.intPercentage);
    setCapitalWithdrawPercIn6month(settingsValues[2]?.intPercentage);
    setMinWithdrawAmtWallet(settingsValues[3]?.intPercentage);
    setReferalIncome3LevelsLimit(settingsValues[4]?.intInvestmentLimit);
    setReferalIncome7LevelsLimit(settingsValues[5]?.intInvestmentLimit);
    setReferalIncome5LevelsLimit(settingsValues[9]?.intInvestmentLimit);
    setTeamPoolPercValue(settingsValues[6]?.intPercentage.toString());
  }, [settingsValues]);
  const getValueChange = (i) => {
    switch (i) {
      case 0:
        return subscriptionFee;
      case 1:
        return allWithdrawPerc;
      case 2:
        return capitalWithdrawPercIn6month;
      case 3:
        return minWithdrawAmtWallet;
      case 4:
        return referalIncome3LevelsLimit;
      case 5:
        return referalIncome7LevelsLimit;
      case 6:
        return parseFloat(teampoolPercValue);
      case 7:
        return referalIncome5LevelsLimit;
      default:
        return 0;
    }
  };
  const handleClickUpdate = (i, id) => {
    const strType = 'settings';
    const type = 'commonUpdate';
    const value = getValueChange(i);
    const data = {
      strType,
      type,
      _id: id,
      objDocument:
        i === 4 || i === 5 || i === 7
          ? {
              intInvestmentLimit: value
            }
          : {
              intPercentage: value
            }
    };
    dispatch(updateSettings(data));
  };
  const handleChangePerc = (value) => {
    // const decimalValue = parseFloat(value);
    setTeamPoolPercValue(value);
  };
  return (
    <Grid container sx={{ p: 2 }}>
      {settingsValues.length > 0 && (
        <Grid item xs={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Typography>Subscription Fee : </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <TextField
                        size="small"
                        type="number"
                        value={subscriptionFee}
                        onChange={(e) => setSubscriptionFee(parseInt(e.target.value))}
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Button
                        variant="contained"
                        onClick={() => handleClickUpdate(0, settingsValues[0]?._id)}
                        disabled={subscriptionFee === settingsValues[0]?.intPercentage}
                      >
                        update
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Typography>All Withdraw Percentage : </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <TextField
                        size="small"
                        type="number"
                        value={allWithdrawPerc}
                        onChange={(e) => setAllWithdrawPerc(parseInt(e.target.value))}
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Button
                        variant="contained"
                        onClick={() => handleClickUpdate(1, settingsValues[1]?._id)}
                        disabled={allWithdrawPerc === settingsValues[1]?.intPercentage}
                      >
                        update
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Typography>Capital Withdraw Percentage : </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <TextField
                        size="small"
                        type="number"
                        value={capitalWithdrawPercIn6month}
                        onChange={(e) => setCapitalWithdrawPercIn6month(parseInt(e.target.value))}
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Button
                        variant="contained"
                        onClick={() => handleClickUpdate(2, settingsValues[2]?._id)}
                        disabled={capitalWithdrawPercIn6month === settingsValues[2]?.intPercentage}
                      >
                        update
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Typography>Mininimum Withdraw amount : </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <TextField
                        size="small"
                        type="number"
                        value={minWithdrawAmtWallet}
                        onChange={(e) => setMinWithdrawAmtWallet(parseInt(e.target.value))}
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Button
                        variant="contained"
                        onClick={() => handleClickUpdate(3, settingsValues[3]?._id)}
                        disabled={minWithdrawAmtWallet === settingsValues[3]?.intPercentage}
                      >
                        update
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Typography>Amount Limit for 3 levels : </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <TextField
                        size="small"
                        type="number"
                        value={referalIncome3LevelsLimit}
                        onChange={(e) => setReferalIncome3LevelsLimit(parseInt(e.target.value))}
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Button
                        variant="contained"
                        onClick={() => handleClickUpdate(4, settingsValues[4]?._id)}
                        disabled={referalIncome3LevelsLimit === settingsValues[4]?.intInvestmentLimit}
                      >
                        update
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Typography>Amount Limit for 5 levels : </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <TextField
                        size="small"
                        type="number"
                        value={referalIncome5LevelsLimit}
                        onChange={(e) => setReferalIncome5LevelsLimit(parseInt(e.target.value))}
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Button
                        variant="contained"
                        onClick={() => handleClickUpdate(7, settingsValues[9]?._id)}
                        disabled={referalIncome5LevelsLimit === settingsValues[9]?.intInvestmentLimit}
                      >
                        update
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Typography>Amount Limit for 7 levels : </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <TextField
                        size="small"
                        type="number"
                        value={referalIncome7LevelsLimit}
                        onChange={(e) => setReferalIncome7LevelsLimit(parseInt(e.target.value))}
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Button
                        variant="contained"
                        onClick={() => handleClickUpdate(5, settingsValues[5]?._id)}
                        disabled={referalIncome7LevelsLimit === settingsValues[5]?.intInvestmentLimit}
                      >
                        update
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Typography>Infinity Percentage : </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <TextField
                        size="small"
                        type="number"
                        value={teampoolPercValue}
                        onChange={(e) => handleChangePerc(e.target.value)}
                        inputProps={{ pattern: '^[0-9]+(\\.[0-9]+)?$' }}
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Button
                        variant="contained"
                        onClick={() => handleClickUpdate(6, settingsValues[6]?._id)}
                        disabled={teampoolPercValue === settingsValues[6]?.intPercentage.toString()}
                      >
                        update
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ManageFees;
