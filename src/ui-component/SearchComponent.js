import { Grid, InputAdornment, OutlinedInput, styled, useTheme } from '@mui/material';
import React from 'react';
import { IconSearch } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: 434,
  marginLeft: 16,
  paddingLeft: 16,
  paddingRight: 16,
  '& input': {
    background: 'transparent !important',
    paddingLeft: '4px !important'
  },
  [theme.breakpoints.down('lg')]: {
    width: 250
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 4,
    background: '#fff'
  }
}));

const SearchComponent = ({ searchValue, setSearchValue }) => {
  const theme = useTheme();
  return (
    <Grid container justifyContent={'left'}>
      <OutlineInputStyle
        sx={{ height: '37px', marginLeft: '1px' }}
        id="input-search-header"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search"
        endAdornment={
          <InputAdornment position="start">
            <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
          </InputAdornment>
        }
        aria-describedby="search-helper-text"
        inputProps={{ 'aria-label': 'weight' }}
      />
    </Grid>
  );
};

export default SearchComponent;
