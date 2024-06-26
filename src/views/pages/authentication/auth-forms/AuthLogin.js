import { useState } from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  // Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
  // useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { login } from 'store/auth/actions';
import { useNavigate } from 'react-router';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  // const customization = useSelector((state) => state.customization);
  const [checked, setChecked] = useState(true);
  const [errMsg, setErrMsg] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}></Grid>

      <Formik
        initialValues={{
          strLoginId: '',
          strPassword: ''
          // submit: null
        }}
        validationSchema={Yup.object().shape({
          strLoginId: Yup.string().required('This is required'),
          strPassword: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          // if (scriptedRef.current) {
          //   setStatus({ success: true });
          //   setSubmitting(false);
          // }
          try {
            const res = await dispatch(login({ username: values.strLoginId, password: values.strPassword }));
            navigate('/dashboard');
          } catch (err) {
            if (err?.response?.data?.strMessage === 'CREDENTIAL_INVALID') {
              setErrMsg({
                alertType: 'error',
                message: 'Invalid username/phone number or password'
              });
              setTimeout(() => {
                setErrMsg(null);
              }, 5000);
            }
            if (err?.message === 'User type not allowed') {
              setErrMsg({
                alertType: 'error',
                message: 'Something Went Wrong'
              });
              setTimeout(() => {
                setErrMsg(null);
              }, 5000);
            }
            // if (scriptedRef.current) {
            //   setStatus({ success: false });
            //   setErrors({ submit: err.message });
            //   setSubmitting(false);
            // }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.strLoginId && errors.strLoginId)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.strLoginId}
                name="strLoginId"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Username"
                inputProps={{}}
              />
              {touched.strLoginId && errors.strLoginId && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.strLoginId}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.strPassword && errors.strPassword)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.strPassword}
                name="strPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.strPassword && errors.strPassword && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.strPassword}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Remember me"
              />
              {/* <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password?
              </Typography> */}
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            {errMsg && (
              <Alert variant="filled" severity="error">
                {errMsg.message}
              </Alert>
            )}
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
