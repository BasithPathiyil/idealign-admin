import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { handleToken } from 'utils/jwt';
import { LOGIN_SUCCESS } from 'store/auth/constants';

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(null);
  const location = useLocation();

  const verifyToken = async (token) => {
    try {
      console.log('working evry');
      // let url=`http://localhost:5000/api/verify_token`
      let url = `/api/verify_token`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Token verification failed');
      }

      const data = await response.json();
      // Assuming the response contains user data
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      handleToken(token);
      setIsVerified(true);
    } catch (error) {
      console.error(error);
      handleToken(null);
      setIsVerified(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      verifyToken(token);
    } else {
      setIsVerified(false);
    }
  }, [dispatch]);

  if (isVerified === null) {
    // You can return a loading spinner or null while the token is being verified
    return <div>Loading...</div>;
  }

  if (!isVerified) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node
};

export default PrivateRoute;
