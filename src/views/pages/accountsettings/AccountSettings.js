import { Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import SmallDisplayCards from 'ui-component/cards/SmallDisplayCards';
import CustomDrawer from 'ui-component/drawer/CustomDrawer';
import UserProfile from '../profile/UserProfile';
import LevelsEditForm from './levels/LevelsEditForm';
import ManageFees from './fee/ManageFees';
import PaymentQRs from './PaymentQr/PaymentQRs';
import PrimeReward from './primereward/PrimeReward';
import TopUpInvestmentToggle from './TopupInvestment/TopUpInvestmentToggle';

const AccountSettings = () => {
  const [titlecard, setTitlecard] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => setOpenDrawer(true);
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setTitlecard(null);
  };
  useEffect(() => {
    if (titlecard) {
      handleOpenDrawer();
    } else {
      handleCloseDrawer();
    }
  }, [titlecard]);
  const changeDrawerContent = (type) => {
    switch (type) {
      case 'Profile':
        return <UserProfile />;
      case 'Levels':
        return <LevelsEditForm />;
      case 'Fee':
        return <ManageFees />;
      case 'Payment Accounts':
        return <PaymentQRs />;
      case 'Prime Reward':
        return <PrimeReward />;
      case 'Top Up Investment':
        return <TopUpInvestmentToggle />;
      case null:
        return null;
      default:
        return null;
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Card sx={{ padding: '16px' }}>
          <Typography variant="h3">Account Settings</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container>
          <Grid item md={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <SmallDisplayCards title={'Profile'} content={'Email,phone..'} titlecard={titlecard} setTitlecard={setTitlecard} />
              </Grid>
              <Grid item xs={12} md={12}>
                <SmallDisplayCards title={'Levels'} content={'Direct,percentage..'} titlecard={titlecard} setTitlecard={setTitlecard} />
              </Grid>
              <Grid item xs={12} md={12}>
                <SmallDisplayCards title={'Fee'} content={'Manage,edit..'} titlecard={titlecard} setTitlecard={setTitlecard} />
              </Grid>
              <Grid item xs={12} md={12}>
                <SmallDisplayCards
                  title={'Payment Accounts'}
                  content={'Gpay,PhonePay..'}
                  titlecard={titlecard}
                  setTitlecard={setTitlecard}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <SmallDisplayCards
                  title={'Prime Reward'}
                  content={'View,edit prime reward settings'}
                  titlecard={titlecard}
                  setTitlecard={setTitlecard}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <SmallDisplayCards
                  title={'Top Up Investment'}
                  content={'Auto approve enable/disable'}
                  titlecard={titlecard}
                  setTitlecard={setTitlecard}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}></Grid>
        </Grid>
      </Grid>

      <CustomDrawer open={openDrawer} onClose={handleCloseDrawer} title={titlecard}>
        {changeDrawerContent(titlecard)}
      </CustomDrawer>
    </Grid>
  );
};

export default AccountSettings;
