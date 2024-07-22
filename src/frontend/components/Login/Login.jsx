import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../basicComponents/Navbar';
import axios from 'axios'; 

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(""); 

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
      
      const response = await axios.post('http://localhost:4000/api/login', form);

      if (response.data.success) {
        navigate('/home');
      } else {
        setError('Invalid Username or Password');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError('Server error. Please try again later.');
    }

    setForm({
      username: "",
      password: "",
    });
  };

  return (
    <div className='w-screen sm:h-screen flex justify-center items-center flex-col gap-2'>
      <Navbar />
      <div className='w-[70vw] sm:w-[40%] sm:h-[80%] h-[50vh] p-2 bg-slate-800 text-white flex flex-col justify-center items-center gap-2 border-2 border-black rounded'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <label htmlFor="username">Username :</label>
          <input
            type="text"
            name='username'
            className='border-black border-2 rounded text-black'
            value={form.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password :</label>
          <input
            type="password"
            name="password"
            className='border-black border-2 rounded text-black'
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className='bg-blue-900 p-2 text-white rounded'
          >
            Login
          </button>

          {error && <p className='text-red-500'>{error}</p>} 

          <p>Create a new account? <Link to={'/'} className='text-blue-700'>Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
