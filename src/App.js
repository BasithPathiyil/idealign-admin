import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from 'store/auth/constants';
import { handleToken } from 'utils/jwt';

// ==============================|| APP ||============================== //

const App = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   return () => {
  //     localStorage.removeItem('isAuthenticate');
  //     localStorage.removeItem('user');
  // dispatch({
  //   type: LOGOUT_SUCCESS,
  //   payload: false
  // });
  //   };
  // }, []);
  useEffect(() => {
    const isAuthenticate = localStorage.getItem('isAuthenticate');
    const userDetail = JSON.parse(localStorage.getItem('user'));
    if (isAuthenticate && userDetail) {
      handleToken(userDetail?.strToken);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          loginSuccess: true,
          userDetails: userDetail
        }
      });
    } else {
      handleToken(null);
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: false
      });
    }
  }, []);
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
