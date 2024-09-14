import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Edit = () => {
  const initialUserState = {
    fname: '',
    lname: '',
    email: ''
  };

  const { id } = useParams();
  const navigate = useNavigate(); // For navigation after successful update
  const [user, setUser] = useState(initialUserState);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/getone/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8000/api/update/${id}`, user);

      if (response.data.message) {
        toast.success(response.data.message, { position: 'top-right' });
      }

      console.log('Updated data:', response.data.data);
      navigate('/');
      setUser(initialUserState);

    } catch (error) {
      toast.error('Error occurred while updating data', { position: 'top-right' });
      console.error('Error while updating data:', error.message || error.response.data);
    }
  };

  return (
    <div className='addUser'>
      <Link to={'/'}>Back</Link>
      <h3>Update Student Data</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id='fname'
            name='fname'
            autoComplete='off'
            placeholder='First Name'
            value={user.fname}
            onChange={inputChangeHandler}
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
            value={user.lname}
            onChange={inputChangeHandler}
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
            value={user.email}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="inputGroup">
          <button type='submit'>Update</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
