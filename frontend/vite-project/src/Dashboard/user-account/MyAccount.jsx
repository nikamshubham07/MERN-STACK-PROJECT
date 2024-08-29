import React from 'react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {authContext} from './../../context/AuthContext'
import userImg from '../../assets/images/doctor-img01.png'

const MyAccount = () => {
  const { dispatch }= useContext(authContext);
  const [tab, setTab] = useState('bookings')
  const navigate = useNavigate(); // Initialize useNavigate
  const handleLogout = ()=>{
    dispatch({type: "LOGOUT" })
    navigate('/login'); 
  }

  return (
    <div className='max-w-[1170px] px-5 mx-auto'>
      <div className='grid md:grid-cols-3 gap-10'>
        <div className='pb-[50px] px-[30px] rounded-md'>
          <div className='flex items-center justify-center'>
            <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
              <img src={userImg} alt='' className='w-full h-full rounded-full'/>
            </figure>
          </div>
          <div className='text-center mt-4'>
            <h3 className='text-[18px] leading-[30px] text-headingClor font-bold'>Muhibur Rahman</h3>
            <p className='text-textColor text-[15px] leading-6 font-medium'>example@gmail.com</p>
            <p className='text-textColor text-[15px] leading-6 font-medium'>
              Blood type: <span className='ml-2 text-headingClor text-[22px] leading-8'>0-</span>
            </p>
          </div>
          <div className='mt-[50px] md:mt-[100px]'>
            <button onClick={handleLogout} className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>Logout</button>
            <button className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>Delete account</button>
          </div>
        </div>
        <div className='md:col-span-2 md:px-[30px]'>
          <div>
            <button onClick={() => setTab('bookings')} className='"p-2 mr-5 px-5 rounded-md text-headingClor font-semibold text-[16px] leading-7 border border-solid border-primaryColor'>
              My Booking
            </button>
            <button onClick={() => setTab('settings')} className='"py-2 px-5 rounded-md text-headingClor font-semibold text-[16px] leading-7 border border-solid border-primaryColor'>
              Profile Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAccount
