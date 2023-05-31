import React from 'react'
import { useNavigate } from "react-router-dom";
import {HiHome} from 'react-icons/hi'
import {CgProfile} from 'react-icons/cg'
import {VscSignIn} from 'react-icons/vsc'



export default function Navbar() {

const navigate = useNavigate();


  return (
    <div className=' shadow-gray-200 shadow-sm bg-white'>

    <header>
        <div className="navbar">
  <div className="navbar-start ">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-square">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 ">
        <li onClick={() => navigate("/profile")}><a>Profile</a></li>
        <li onClick={() => navigate("/")}><a>Homepage</a></li>
        <li><a>About</a></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center" onClick={() => navigate("/")}>
    <a className="btn btn-ghost normal-case text-2xl text-orange-500">BlogStack</a>
  </div>

  {/* end icons of navbar  */}
<div className="navbar-end">

    <button className="btn btn-ghost btn-square border-b-orange-500 border-y-2" onClick={() => navigate("/")}>
        <HiHome className="h-6 w-6"  />
       
    </button>

    <button className="btn btn-ghost btn-square" onClick={()=>navigate("/sign-in")}>
        {/* <CgProfile className='h-6 w-6'/> */}
        <VscSignIn className="h-6 w-6"/>
    </button>

</div>


</div>
      </header>

    </div>
   
  )
}
