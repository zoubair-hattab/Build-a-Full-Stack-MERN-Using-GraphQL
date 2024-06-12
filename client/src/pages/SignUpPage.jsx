import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER } from '../graphql/mutations/user.mutation';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
const SignUpPage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    gender: '',
    password: '',
  });

  const [signup, { loading }] = useMutation(REGISTER, {
    refetchQueries: ['GetAuthenticatedUser'],
  });
  const handleChangeInput = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      await signup({ variables: { input: userData } });
      toast.success('Your registration has been stored.');
      navigate('/login');
    } catch (error) {
      console.error('Error logging in:', error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="container h-screen flex items-center justify-center">
      <form
        onSubmit={handleSumbit}
        className="max-w-lg bg-gray-50 w-full p-6 shadow-xl  rounded-md border border-gray-200"
      >
        <div className="mb-5">
          <h2 className="text-center text-2xl font-semibold"> SignUp Page</h2>
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
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="jhon"
            onChange={handleChangeInput}
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
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-5 flex items-center gap-6">
          <label
            htmlFor="file"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your photo
          </label>
          <img
            src={image && URL.createObjectURL(image)}
            alt=""
            className="w-20 h-20 rounded-full border border-gray-500 object-cover"
          />
          <input
            type="file"
            id="file"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="mb-5 flex items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <label
              htmlFor="male"
              className="block  text-sm font-medium text-gray-900 dark:text-white"
            >
              Male
            </label>
            <input
              type="radio"
              id="gender"
              name="gender"
              value="male"
              onChange={handleChangeInput}
            />
          </div>
          <div className="flex items-center gap-3">
            <label
              htmlFor="male"
              className="block  text-sm font-medium text-gray-900 dark:text-white"
            >
              female
            </label>
            <input
              type="radio"
              id="gender"
              name="gender"
              value="female"
              onChange={handleChangeInput}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <div>
          <small className="text-sm text-gray-400 ">
            Already have an account?
            <Link to="/login" className="text-indigo-500 ml-1 font-semibold">
              Login here
            </Link>
          </small>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
