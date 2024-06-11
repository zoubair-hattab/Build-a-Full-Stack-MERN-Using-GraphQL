import { useQuery } from '@apollo/client';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { GET_AUTHENTICATED_USER } from '../../graphql/queries/user.query';

const IsNotAuth = () => {
  const { loading, data } = useQuery(GET_AUTHENTICATED_USER);
  console.log(data);
  if (loading) return null;
  return data?.authUser ? <Navigate to="/" /> : <Outlet />;
};

export default IsNotAuth;
