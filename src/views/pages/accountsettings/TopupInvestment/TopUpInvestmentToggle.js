import { Grid, Switch, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings, updateSettings } from 'store/settings/actions';

const TopUpInvestmentToggle = () => {
  const dispatch = useDispatch();
  const [autoStatus, setAutoStatus] = useState(false);
  const [profitStaus, setProfitStatus] = useState(false);

  useEffect(() => {
    dispatch(getSettings({ strType: 'settings', type: 'commonList' }));
  }, []);
  const { settingsValues } = useSelector((state) => state?.settings);
  const topUpInv = settingsValues?.find((settingsValue) => settingsValue.strName === 'TOPUP_INV_AUTO_APPROVE');
  const topUpProfit = settingsValues?.find((settingsValue) => settingsValue.strName === 'TOPUP_REFERRAL_ENABLE');
  console.log('topUpInv', topUpInv);
  useEffect(() => {
    if (topUpInv) {
      setAutoStatus(topUpInv.autoApprove);
    }
  }, [topUpInv]);
  useEffect(() => {
    if (topUpProfit) {
      setProfitStatus(topUpProfit.enable);
    }
  }, [topUpProfit]);
  console.log('status', autoStatus);
  const handleChangeSwitch = (e, newValue) => {
    console.log('e', e.target.value, newValue);
    const strType = 'settings';
    const type = 'commonUpdate';

    const data = {
      strType,
      type,
      _id: topUpInv._id,
      objDocument: {
        autoApprove: newValue
      }
    };
    console.log('data', data);
    dispatch(updateSettings(data));
  };
  const handleChangeSwitchProfit = (e, newValue) => {
    console.log('e', e.target.value, newValue);
    const strType = 'settings';
    const type = 'commonUpdate';

    const data = {
      strType,
      type,
      _id: topUpProfit._id,
      objDocument: {
        enable: newValue
      }
    };
    console.log('data', data);
    dispatch(updateSettings(data));
  };
  return (
    <Grid container spacing={2} sx={{ padding: '16px' }}>
      <Grid item xs={12}>
        <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="h4">Enable/Disable</Typography>
          <Switch onChange={(e, newValue) => handleChangeSwitch(e, newValue)} checked={autoStatus} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          Enabling auto approve for topup investments will result in the users to directly invest the amount with their available balance in
          wallet without out permission. Disabling auto approve will result for the approval system for topup investments.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="h4">Referal profit Enable/Disable</Typography>
          <Switch onChange={(e, newValue) => handleChangeSwitchProfit(e, newValue)} checked={profitStaus} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          Enabling profit for topup investment will lead to getting the referral benefit after each topup investments.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TopUpInvestmentToggle;
