import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; // Import the useDispatch hook
import { ShowLoading, HideLoading } from '../redux/alertSlice'; // Import your Redux actions
import { axiosInstance } from '../helpers/axiosInstance';
import { message } from 'antd';

function User() {
  const [user, setUser] = useState();
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  const getUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post('/api/users/get-single-user', {});
      dispatch(HideLoading());
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        dispatch(HideLoading());
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getUser(); // Call the getUser function to fetch user data
  }, []);

  return (
    <div className=' d-flex card p-3'>
      {/* Render user data here */}
      {user && (
        <>
          <p className='text-lg'><b className='text-lg'>Name :   </b> {user.name}</p>
          <p className='text-lg'><b className='text-lg'>Email :  </b> {user.email}</p>
          {/* Add more user details as needed */}
        </>
      )}
    </div>
  );
}

export default User;