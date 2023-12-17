import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login'
import Register from '../Components/Register'
import Profile from '../Components/Profile'
import UserProtected from './userProtected'
import { UseAppSelector } from '../Redux/hooks'

const UserRoute = () => {

  const IsAuthUser = UseAppSelector(state=>state.User.accessToken)

  return (
    <Routes>
         <Route path='/login' element={IsAuthUser?<Profile/>:<Login/>}/>
        <Route path='/login' element={<Login/>}/>

        <Route path='/signup' element={<Register/>}/>
        <Route path='/profile' element={<UserProtected><Profile/></UserProtected>}/>
    </Routes>
  )
}

export default UserRoute
