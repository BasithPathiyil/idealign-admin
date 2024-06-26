import { Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLevels, updateLevel } from 'store/levels/actions';

const LevelsEditForm = () => {
  const dispatch = useDispatch();
  const [level1Value, setLevel1Value] = useState(null);
  const [level2Value, setLevel2Value] = useState(null);
  const [level3Value, setLevel3Value] = useState(null);
  const [level4Value, setLevel4Value] = useState(null);
  const [level5Value, setLevel5Value] = useState(null);
  const [level6Value, setLevel6Value] = useState(null);
  const [level7Value, setLevel7Value] = useState(null);
  const [level8Value, setLevel8Value] = useState(null);
  const [level9Value, setLevel9Value] = useState(null);
  const [level10Value, setLevel10Value] = useState(null);
  useEffect(() => {
    dispatch(getLevels());
  }, []);
  const { activeLevels } = useSelector((state) => state?.levels);
  useEffect(() => {
    if (activeLevels.length > 0) {
      setLevel1Value(activeLevels[0].intIncomePercentage);
      setLevel2Value(activeLevels[1].intIncomePercentage);
      setLevel3Value(activeLevels[2].intIncomePercentage);
      setLevel4Value(activeLevels[3].intIncomePercentage);
      setLevel5Value(activeLevels[4].intIncomePercentage);
      setLevel6Value(activeLevels[5].intIncomePercentage);
      setLevel7Value(activeLevels[6].intIncomePercentage);
      setLevel8Value(activeLevels[7].intIncomePercentage);
      setLevel9Value(activeLevels[8].intIncomePercentage);
      setLevel10Value(activeLevels[9].intIncomePercentage);
    }
  }, [activeLevels]);
  const handleChange = (e, i) => {
    if (i === 1) {
      setLevel1Value(parseFloat(e.target.value));
    }
    if (i === 2) {
      setLevel2Value(parseFloat(e.target.value));
    }
    if (i === 3) {
      setLevel3Value(parseFloat(e.target.value));
    }
    if (i === 4) {
      setLevel4Value(parseFloat(e.target.value));
    }
    if (i === 5) {
      setLevel5Value(parseFloat(e.target.value));
    }
    if (i === 6) {
      setLevel6Value(parseFloat(e.target.value));
    }
    if (i === 7) {
      setLevel7Value(parseFloat(e.target.value));
    }
    if (i === 8) {
      setLevel8Value(parseFloat(e.target.value));
    }
    if (i === 9) {
      setLevel9Value(parseFloat(e.target.value));
    }
    if (i === 10) {
      setLevel10Value(parseFloat(e.target.value));
    }
  };
  const handleClickUpdate = (value) => {
    if (value === 1) {
      dispatch(updateLevel(value, level1Value));
    }
    if (value === 2) {
      dispatch(updateLevel(value, level2Value));
    }
    if (value === 3) {
      dispatch(updateLevel(value, level3Value));
    }
    if (value === 4) {
      dispatch(updateLevel(value, level4Value));
    }
    if (value === 5) {
      dispatch(updateLevel(value, level5Value));
    }
    if (value === 6) {
      dispatch(updateLevel(value, level6Value));
    }
    if (value === 7) {
      dispatch(updateLevel(value, level7Value));
    }
    if (value === 8) {
      dispatch(updateLevel(value, level8Value));
    }
    if (value === 9) {
      dispatch(updateLevel(value, level9Value));
    }
    if (value === 10) {
      dispatch(updateLevel(value, level10Value));
    }
  };
  return (
    <Grid container>
      {activeLevels.length > 0 && (
        <Grid item xs={12} md={12}>
          <Grid container sx={{ p: 2 }} spacing={2}>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography>Level 1 :</Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    type="number"
                    inputProps={{ step: 'any' }}
                    size="small"
                    value={level1Value}
                    onChange={(e) => handleChange(e, 1)}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button
                    onClick={() => handleClickUpdate(1)}
                    disabled={level1Value === activeLevels[0].intIncomePercentage}
                    variant="contained"
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography>Level 2 :</Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    type="number"
                    inputProps={{ step: 'any' }}
                    size="small"
                    value={level2Value}
                    onChange={(e) => handleChange(e, 2)}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button
                    onClick={() => handleClickUpdate(2)}
                    disabled={level2Value === activeLevels[1].intIncomePercentage}
                    variant="contained"
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography>Level 3 :</Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    type="number"
                    inputProps={{ step: 'any' }}
                    size="small"
                    value={level3Value}
                    onChange={(e) => handleChange(e, 3)}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button
                    onClick={() => handleClickUpdate(3)}
                    disabled={level3Value === activeLevels[2].intIncomePercentage}
                    variant="contained"
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography>Level 4 :</Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    type="number"
                    inputProps={{ step: 'any' }}
                    size="small"
                    value={level4Value}
                    onChange={(e) => handleChange(e, 4)}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button
                    onClick={() => handleClickUpdate(4)}
                    disabled={level4Value === activeLevels[3].intIncomePercentage}
                    variant="contained"
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography>Level 5 :</Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    type="number"
                    inputProps={{ step: 'any' }}
                    size="small"
                    value={level5Value}
                    onChange={(e) => handleChange(e, 5)}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button
                    onClick={() => handleClickUpdate(5)}
                    disabled={level5Value === activeLevels[4].intIncomePercentage}
                    variant="contained"
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography>Level 6 :</Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    type="number"
                    inputProps={{ step: 'any' }}
                    size="small"
                    value={level6Value}
                    onChange={(e) => handleChange(e, 6)}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button
                    onClick={() => handleClickUpdate(6)}
                    disabled={level6Value === activeLevels[5].intIncomePercentage}
                    variant="contained"
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Typography>Level 7 :</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      type="number"
                      inputProps={{ step: 'any' }}
                      size="small"
                      value={level7Value}
                      onChange={(e) => handleChange(e, 7)}
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Button
                      onClick={() => handleClickUpdate(7)}
                      disabled={level7Value === activeLevels[6].intIncomePercentage}
                      variant="contained"
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Typography>Level 8 :</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      type="number"
                      inputProps={{ step: 'any' }}
                      size="small"
                      value={level8Value}
                      onChange={(e) => handleChange(e, 8)}
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Button
                      onClick={() => handleClickUpdate(8)}
                      disabled={level8Value === activeLevels[7].intIncomePercentage}
                      variant="contained"
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Typography>Level 9 :</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      type="number"
                      inputProps={{ step: 'any' }}
                      size="small"
                      value={level9Value}
                      onChange={(e) => handleChange(e, 9)}
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Button
                      onClick={() => handleClickUpdate(9)}
                      disabled={level9Value === activeLevels[8].intIncomePercentage}
                      variant="contained"
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Typography>Level 10 :</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      type="number"
                      inputProps={{ step: 'any' }}
                      size="small"
                      value={level10Value}
                      onChange={(e) => handleChange(e, 10)}
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Button
                      onClick={() => handleClickUpdate(10)}
                      disabled={level10Value === activeLevels[9].intIncomePercentage}
                      variant="contained"
                    >
                      Update
                    </Button>
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

export default LevelsEditForm;
