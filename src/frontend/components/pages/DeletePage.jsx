import axios from 'axios'
import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

const DeletePage = () => {
    const {files } = useParams()
    const navigate =useNavigate()
    const deleteDataApi =async ()=>{
        await axios.delete(`http://localhost:4000/delete/${files}`)
        navigate("/home")
    }
    deleteDataApi()

}

export default DeletePage