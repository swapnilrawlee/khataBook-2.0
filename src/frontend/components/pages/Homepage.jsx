import React, { useEffect, useState } from "react";
import Navbar from "../basicComponents/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const Homepage = () => {
  const [data, setData] = useState([]);

  const ApiData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/data");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    ApiData();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-slate-800 ">
      <Navbar />
      <div className="h-[10vh] flex items-center justify-end ">
        <Link
          to={"/create"}
          className="text-white text-xl flex justify-end items-center px-4 py-2"
        >
          <h3 className="bg-white text-black px-2 rounded">Create a file</h3>
        </Link>
      </div>
      <div>
        <ul className=" p-2 flex flex-col gap-4 min-h-[50%]">
          {data.length>0 ? data.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 rounded ml-5 sm:w-[40%] w-[70%] bg-red-100"
            >
              <li>{file}</li>
              <div className="flex gap-4">
                <Link to={`/edit/${file}`}>
                  <button className="bg-blue-900 p-2 rounded text-white">
                    Edit
                  </button>
                </Link>
                <Link to={`/delete/${file}`}>
                  <button className="bg-blue-900 p-2 rounded text-white">
                    delete
                  </button>
                </Link>
              </div>
            </div>
          )):<h1 className="flex capitalize text-white text-6xl justify-center items-center">No data available.....</h1>}
        </ul>
      </div>
    </div>
  );
};

export default Homepage;
