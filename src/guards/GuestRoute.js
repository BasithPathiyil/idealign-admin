import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { LOGIN_SUCCESS } from 'store/auth/constants';
import { useEffect } from 'react';
import { handleToken } from 'utils/jwt';

const GuestRoute = ({ children }) => {
  const isTokenPresent = () => !!localStorage.getItem('accessToken');
  if (isTokenPresent()) {
    let token = localStorage.getItem('accessToken');
    handleToken(token);
  }
  console.log('isTokenPresent() guest route', isTokenPresent());
  if (isTokenPresent()) {
    console.log('working');
    return <Navigate to="/dashboard" />;
  }
  return <>{children}</>;
};

GuestRoute.propTypes = {
  children: PropTypes.node
};

export default GuestRoute;
