import React, { useState } from 'react';
import Navbar from '../basicComponents/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [objData, setObjData] = useState([]);
  const navigate = useNavigate();

  const dataHandler = async () => {
    const newEntry = { title, content };
    setObjData((prevObjData) => [...prevObjData, newEntry]);

    try {
      await axios.post('http://localhost:4000/create', { title, content });
      navigate('/home');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Something went wrong', error);
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-800">
      <Navbar />
      <div className="flex gap-4 w-[50%] flex-col justify-center items-center my-4 mx-auto">
        <div className="w-full">
          <label htmlFor="title" className="block text-white">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value.trim())}
            className="w-full p-2 border-2 border-white rounded"
          />
        </div>
        <div className="w-full mt-2">
          <label htmlFor="content" className="block text-white">Content:</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border-2 border-white rounded"
          ></textarea>
        </div>
        <button
          className="bg-white px-4 py-2 rounded mt-4"
          onClick={()=>dataHandler()}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CreatePage;
