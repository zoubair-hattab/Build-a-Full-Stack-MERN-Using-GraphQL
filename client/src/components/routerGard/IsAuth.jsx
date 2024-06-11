import { useQuery } from '@apollo/client';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { GET_AUTHENTICATED_USER } from '../../graphql/queries/user.query';

const IsAuth = () => {
  const { loading, data } = useQuery(GET_AUTHENTICATED_USER);
  if (loading) return null;
  return data?.authUser ? <Outlet /> : <Navigate to="/login" />;
};

export default IsAuth;
