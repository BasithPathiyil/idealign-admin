import { Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings, updateSettings } from 'store/settings/actions';

const PrimeReward = () => {
  const [minInvestmentUser, setMinInvestmentUser] = useState(0);
  const [percPrimeReward, setPercPrimeReward] = useState(null);
  const [minInvestmentEachDirectReferral, setMinInvestmentEachDirectReferral] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSettings({ strType: 'settings', type: 'commonList' }));
  }, []);
  const { settingsValues } = useSelector((state) => state?.settings);
  const primeRewardSetting = settingsValues?.find((settingsValue) => settingsValue.strName === 'PRIME_REWARD');
  useEffect(() => {
    if (primeRewardSetting) {
      setMinInvestmentUser(primeRewardSetting.intMinInvUser);
      setPercPrimeReward(primeRewardSetting.intPercPrimeReward);
      setMinInvestmentEachDirectReferral(primeRewardSetting.intMinInvDirectReferral);
    }
  }, [primeRewardSetting]);
  const getValueChange = (i) => {
    switch (i) {
      case 0:
        return { intMinInvUser: parseFloat(minInvestmentUser) };
      case 1:
        return { intPercPrimeReward: parseFloat(percPrimeReward) };
      case 2:
        return { intMinInvDirectReferral: parseFloat(minInvestmentEachDirectReferral) };

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
      objDocument: value
    };
    console.log('data', data);
    dispatch(updateSettings(data));
  };
  return (
    <Grid container sx={{ p: 2 }}>
      <Grid item xs={12} md={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <Typography>Minimum Investment for user : </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    <TextField
                      size="small"
                      type="number"
                      value={minInvestmentUser}
                      onChange={(e) => setMinInvestmentUser(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Button
                      variant="contained"
                      onClick={() => handleClickUpdate(0, primeRewardSetting?._id)}
                      disabled={minInvestmentUser === primeRewardSetting?.intMinInvUser}
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
                <Typography> Percentage prime reward : </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    <TextField size="small" type="number" value={percPrimeReward} onChange={(e) => setPercPrimeReward(e.target.value)} />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Button
                      variant="contained"
                      onClick={() => handleClickUpdate(1, primeRewardSetting?._id)}
                      disabled={percPrimeReward === primeRewardSetting?.intPercPrimeReward}
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
                <Typography>Minimum Investment For Each Direct Referral : </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    <TextField
                      size="small"
                      type="number"
                      value={minInvestmentEachDirectReferral}
                      onChange={(e) => setMinInvestmentEachDirectReferral(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Button
                      variant="contained"
                      onClick={() => handleClickUpdate(2, primeRewardSetting?._id)}
                      disabled={minInvestmentEachDirectReferral === primeRewardSetting?.intMinInvDirectReferral}
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
    </Grid>
  );
};

export default PrimeReward;
