import React from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router';


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
    <div>
    <button className="btn btn-primary" onClick={onLogout}>SIGN OUT</button>
    </div>
  )
}
