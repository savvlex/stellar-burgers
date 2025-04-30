import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import {
  userDataSelector,
  isAuthCheckedSelector
} from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const currentLocation = useLocation();

  const userInfo = useSelector(userDataSelector);
  const authVerified = useSelector(isAuthCheckedSelector);

  if (!authVerified && userInfo !== null) {
    return <Preloader />;
  }

  if (onlyUnAuth && userInfo) {
    const redirectPath = currentLocation.state?.from || { pathname: '/' };
    return <Navigate replace to={redirectPath} />;
  }

  if (!onlyUnAuth && !userInfo) {
    return <Navigate replace to='/login' state={{ from: currentLocation }} />;
  }

  return children;
};
