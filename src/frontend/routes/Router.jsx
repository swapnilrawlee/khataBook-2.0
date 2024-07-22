import React from 'react'
import {Route ,Routes} from 'react-router-dom'
import Homepage from "../components/pages/Homepage";
import Register from '../components/Login/Register';
import Login from '../components/Login/Login';
import CreatePage from '../components/pages/CreatePage';
import Edit from '../components/pages/Edit';
import DeletePage from '../components/pages/DeletePage';

const Router = () => {
  return (
    <Routes>
        <Route path={'/'} element={<Register/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/home'} element={<Homepage/>}/>
        <Route path={'/create'} element={<CreatePage/>}/>
        <Route path={'/edit'} element={<Edit/>}/>
        <Route path={'/edit/:files'} element={<Edit/>}/>
        <Route path={'/delete/:files'} element={<DeletePage/>}/>
    </Routes>
  )
}

export default Router
