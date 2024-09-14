import React, { useState } from 'react';
import './Add.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Add = () => {
  const initialUserState = {
    fname: '',
    lname: '',
    email: '',
    password: ''
  };

  const [user, setUser] = useState(initialUserState);
  const navigate=useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/create', user);

      if (response.data.message) {
        toast.success(response.data.message, { position: 'top-right' });
      }
      console.log('Saved data:', response.data.data);
      navigate('/')
      setUser(initialUserState);

    } catch (error) {
      toast.error('Error occurred while saving data', { position: 'top-right' });
      console.error('Error while saving data:', error.message || error.response.data);
    }
  };

  return (
    <div className='addUser'>
      <Toaster />
      <Link to={'/'}>Back</Link>
      <h3>Add New Student</h3>
      <form className='addUserForm' onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id='fname'
            name='fname'
            autoComplete='off'
            placeholder='First Name'
            onChange={inputHandler}
            value={user.fname}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id='lname'
            name='lname'
            autoComplete='off'
            placeholder='Last Name'
            onChange={inputHandler}
            value={user.lname}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id='email'
            name='email'
            autoComplete='off'
            placeholder='Enter Email Address'
            onChange={inputHandler}
            value={user.email}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id='password'
            name='password'
            autoComplete='off'
            placeholder='Enter Password'
            onChange={inputHandler}
            value={user.password}
          />
        </div>
        <div className="inputGroup">
          <button type='submit'>Add</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
