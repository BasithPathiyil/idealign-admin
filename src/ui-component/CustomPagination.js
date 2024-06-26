import { Grid, MenuItem, Pagination, Select, styled, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const StyledSelect = styled(Select)(() => ({
  [`& .MuiSelect-select`]: {
    padding: '0.5em',
    borderRadius: '1px'
  }
}));

const CustomPagination = ({ count, page, rowsPerPage, onPageChange, setRowsPerPage }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const handleChange = (e) => {
    onPageChange(1);
    setRowsPerPage(parseInt(e.target.value));
  };
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Box
          sx={{ paddingY: '1em', width: '100%' }}
          display={'flex'}
          justifyContent={matchDownSM ? 'center' : 'left'}
          alignItems={'center'}
        >
          <span>Rows per page: </span>
          <StyledSelect value={rowsPerPage.toString()} onChange={(e) => handleChange(e)}>
            <MenuItem value={'30'}>30</MenuItem>
            <MenuItem value={'40'}>40</MenuItem>
            <MenuItem value={'50'}>50</MenuItem>
          </StyledSelect>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ paddingY: '1em', width: '100%' }} display={'flex'} justifyContent={matchDownSM ? 'center' : 'right'}>
          <Pagination
            size="small"
            color="primary"
            shape="rounded"
            // defaultPage={page}
            // page={page}
            onChange={(event, page) => onPageChange(parseInt(page, 10))}
            count={Math.ceil(count / rowsPerPage)}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CustomPagination;
