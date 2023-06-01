import React from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router';
import {VscSignOut} from 'react-icons/vsc'
import {LuEdit} from 'react-icons/lu';
import {TfiWrite} from 'react-icons/tfi'

export default function Profile() {

const auth=getAuth();
const navigate = useNavigate();

function onLogout()
{
  auth.signOut();
  navigate("/");
  console.log("logged out");

}

  return (
    <div className='w-full items-center flex flex-col'>
    {/* <button className="btn btn-primary " onClick={onLogout}>SIGN OUT <VscSignOut className='h-6 w-6 m-2'/></button> */}

<h1 className="normal-case text-3xl mt-3 font-bold">My Profile</h1>

      <div className=' flex flex-col '>
      <input type="text" placeholder="Name" className="input input-bordered border-orange-500 input-warning w-full max-w-xs mt-6" />
      <input type="text" placeholder="Email address " className="input input-bordered border-orange-500 input-warning w-full max-w-xs mt-6" />
      
      <div className='flex flex-row mt-6 space-x-6'>

      <button className="btn btn-primary ">EDIT PROFILE <LuEdit className='h-6 w-6 m-2'/></button> 
      <button className="btn btn-error btn-outline " onClick={onLogout}>SIGN OUT <VscSignOut className='h-6 w-6 m-2'/></button> 

      </div>
      
      </div>

      <button className="btn btn-primary btn-outline  mt-8 "  onClick={()=>navigate("/publish-blogs")}> <TfiWrite className='h-6 w-6 m-2' /> WRITE NEW BLOG</button>




    </div>
  )
}
