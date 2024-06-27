import React from 'react';
import parse from 'html-react-parser';
import Spacing from './Spacing';
import { Box, Button, Typography } from '@mui/material';

export default function SectionHeading({ title, subtitle, btnLink, btnText, variant, children }) {
  return (
    <Box className={variant ? `cs-section_heading ${variant}` : `cs-section_heading cs-style1`} mb={4}>
      <Typography variant="h6" component="h3" className="cs-section_subtitle">
        {parse(subtitle)}
      </Typography>
      <Typography variant="h4" component="h2" className="cs-section_title">
        {parse(title)}
      </Typography>
      {children}
      {btnText && (
        <>
          <Spacing lg={45} md={20} />
          <Button href={btnLink} variant="contained" color="primary">
            {btnText}
          </Button>
        </>
      )}
    </Box>
  );
}
