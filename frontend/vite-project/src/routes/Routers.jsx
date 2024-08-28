// import React from 'react'
import Home from "../pages/Home"
import Services from "../pages/Services"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Contact from "../pages/Contact"
import Doctors from "../pages/Doctors/Doctors"
import DoctorDetails from "../pages/Doctors/DoctorDetails"
import MyAccount from "../Dashboard/user-account/MyAccount"
import Dashboard from "../Dashboard/doctor-account/Dashboard"

import {Routes, Route} from 'react-router-dom'

const Routers = () => {
  return (
    <div>
         <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/doctors' element={<Doctors/>}/>
            <Route path='/doctors/:id' element={<DoctorDetails/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Signup/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/services' element={<Services/>}/>
            <Route path='/users/profile/ME' element={<MyAccount/>}/>
            <Route path='/doctors/profile/ME' element={<Dashboard/>}/>
         </Routes>
    </div>
  )
}

export default Routers
