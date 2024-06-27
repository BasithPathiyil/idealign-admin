import React from 'react';
import { Box } from '@mui/material';

export default function Spacing({ lg, md }) {
  return (
    <Box
      style={{ height: `${lg}px`, marginBottom: `${md}px` }}
    />
  );
}
