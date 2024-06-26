import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { handleToken } from 'utils/jwt';
import { LOGIN_SUCCESS } from 'store/auth/constants';
import { useState } from 'react';

const PrivateRoute = ({ children }) => {
  const isTokenPresent = () => !!localStorage.getItem('accessToken');
  if (isTokenPresent()) {
    let token = localStorage.getItem('accessToken');
    handleToken(token);
  }
  console.log('!isTokenPresent()', !isTokenPresent());
  if (!isTokenPresent()) {

    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node
};

export default PrivateRoute;
