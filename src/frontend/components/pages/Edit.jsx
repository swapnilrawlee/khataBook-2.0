import React, { useEffect, useState } from "react";
import Navbar from "../basicComponents/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { files } = useParams();
  const [data, setData] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate()

  const Apidatarecive = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/edit/${files}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Apidatasend = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/edit/${files}`, {
        content,
      });
      setContent(response.data);
      setContent("")
      setData("")
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    Apidatarecive();
  }, [data]);

  return (
    <div className="w-screen min-h-screen bg-slate-800">
      <Navbar />
      <button className="text-xl bg-white p-2 mt-2 ml-4 rounded" onClick={()=>navigate("/home")}>Back</button>
      <div className="text-white flex flex-col gap-4 justify-center items-center mt-2 text-2xl">
        <h1>Editing files Name: {files}</h1>
        <label htmlFor="old_content">Old Content</label>
        <textarea
          name="data"
          rows={5}
          readOnly
          value={data}
          className="text-black"
        >
          {data}
        </textarea>
        <label htmlFor="content">New Content</label>
        <textarea
          name="content"
          value={content}
          rows={5}
          className="text-black"
          onChange={(e)=>setContent(e.target.value)}
        ></textarea>
        <button onClick={() => Apidatasend()}>Save Changes</button>
      </div>
    </div>
  );
};
export default Edit;
