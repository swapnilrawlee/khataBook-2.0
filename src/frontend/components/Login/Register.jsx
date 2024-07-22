import React, { useState } from 'react';
import Navbar from '../basicComponents/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    emailid: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:4000/api/register', form);
      navigate('/login');
    } catch (err) {
      console.error("Error registering user:", err);
      // Optionally handle error here
    }
  };

  return (
    <div className='w-screen sm:h-screen flex justify-center items-center flex-col gap-2 '>
      <Navbar />
      <div className='w-[70vw] sm:w-[40%] sm:h-[80%] h-[60vh] p-2 bg-slate-800 text-white flex flex-col justify-center items-center gap-4 sm:gap-2 border-2 border-black rounded'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4 sm:mt-0 sm:gap-2'>
          <label htmlFor="fullname">Name :</label>
          <input
            type="text"
            name='fullname'
            className='border-black border-2 rounded text-black'
            value={form.fullname}
            onChange={handleChange}
          />

          <label htmlFor="emailid">Email-id :</label>
          <input
            type="email"
            name='emailid'
            className='border-black border-2 rounded text-black'
            value={form.emailid}
            onChange={handleChange}
          />

          <label htmlFor="username">Username :</label>
          <input
            type="text"
            name='username'
            className='border-black border-2 rounded text-black'
            value={form.username}
            onChange={handleChange}
          />

          <label htmlFor="password">Password :</label>
          <input
            type="password"
            name="password"
            className='border-black border-2 rounded text-black'
            value={form.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className='bg-blue-900 p-2 text-white rounded'
          >
            Register
          </button>
        </form>

        <p>Already have an account? <Link to={'/login'} className='text-blue-700'>Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
