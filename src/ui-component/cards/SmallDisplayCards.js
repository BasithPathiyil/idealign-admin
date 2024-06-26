import React from 'react';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 275,
    maxWidth: 400,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer'
  },
  content: {
    flex: 1
  },
  arrowButton: {
    marginLeft: 'auto'
  }
});

function SmallDisplayCards(props) {
  const classes = useStyles();
  const handleClick = (title) => {
    if (!props.titlecard) {
      props.setTitlecard(title);
    } else {
      props.setTitlecard(null);
    }
  };

  return (
    <Card className={classes.root} onClick={() => handleClick(props.title)}>
      <CardContent className={classes.content}>
        <Typography variant="h6" color="textPrimary">
          {props.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {props.content}
        </Typography>
      </CardContent>
      <IconButton className={classes.arrowButton} color="primary" aria-label="View Details">
        <DoubleArrowIcon />
      </IconButton>
    </Card>
  );
}

export default SmallDisplayCards;
