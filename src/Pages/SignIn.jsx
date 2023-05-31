import React from 'react'
import { useNavigate } from 'react-router';

export default function SignIn() {
    
    const navigate = useNavigate();
    

  return (
    <div>
      this is signin page
      <button className="  btn btn-primary" onClick={()=>navigate("/profile")}>Go to Profile</button>
    </div>
  )
}
