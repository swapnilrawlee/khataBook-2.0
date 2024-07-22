import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../basicComponents/Navbar';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
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

  const submitHandler = () => {
    if (form.username === 'admin' && form.password === '123') {
      navigate('/home');
    } else {
      navigate('/login');
      alert('Inavlid Username and Password ')
    }
    setForm({
      username: "",
      password: "",
    });
  };

  return (
    <div className='w-screen sm:h-screen  flex justify-center items-center flex-col gap-2'>
      <Navbar />
      <div className='w-[70vw] sm:w-[40%] sm:h-[80%] h-[50vh] p-2 bg-slate-800  text-white flex flex-col justify-center items-center gap-2 border-2 border-black rounded'>
        <label htmlFor="username">Username :</label>
        <input
          type="text"
          name='username'
          className='border-black border-2 rounded  text-black'
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

        <button className='bg-blue-900 p-2 text-white rounded' onClick={submitHandler}>Login</button>

        <p>Create a new account? <Link to={'/'} className='text-blue-700'>Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
