import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGIN } from '../graphql/mutations/user.mutation';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [login, { loading }] = useMutation(LOGIN, {
    refetchQueries: ['GetAuthenticatedUser'],
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password)
      return toast.error('Please fill in all fields');
    try {
      await login({ variables: { input: loginData } });
    } catch (error) {
      console.error('Error logging in:', error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="container h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg bg-gray-50 w-full p-6 shadow-xl  rounded-md border border-gray-200"
      >
        <div className="mb-5">
          <h2 className="text-center text-2xl font-semibold"> Login Page</h2>
        </div>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="jhoe_doe"
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="***********"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="mb-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>

        <div>
          <small className="text-sm text-gray-400 ">
            Don't have an account?
            <Link to="/signup" className="text-indigo-500 ml-1 font-semibold">
              Signup here
            </Link>
          </small>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
