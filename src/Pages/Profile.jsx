import React, { useEffect , useState} from 'react'
import { getAuth ,  updateProfile  } from 'firebase/auth'
import { useNavigate } from 'react-router';
import {VscSignOut} from 'react-icons/vsc'
import {LuEdit} from 'react-icons/lu';
import {TfiWrite} from 'react-icons/tfi'
import { doc, updateDoc ,   orderBy } from "firebase/firestore";
import {db} from '../firebase'
import {toast} from 'react-toastify';
import { collection, query, where, getDocs } from "firebase/firestore";
import BlogItem from '../Components/BlogItem';




export default function Profile() {

const auth=getAuth();
const navigate = useNavigate();
const user = auth.currentUser; 


const [blogs , setBlogs] = useState(null);

const [profileData , setProfileData] = useState(
  {
    name: auth.currentUser.displayName,
    email : auth.currentUser.email,
  }
);
const {name , email} = profileData;

const [changeProfile , setChangeProfile] = useState(false);
// when not able to change profile , changeProfile = false. 

// signOut functionality
function onLogout()
{
  auth.signOut();
  navigate("/");
  // console.log("logged out");

}


// to fetch the profile details of  current user
useEffect(()=>{
  
  function fetchUser()
  {
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const uid = user.uid;

      // console.log(displayName,email,uid);
    }

  }
  fetchUser();

},[user])


// On change functionality for the name input 
 function onChange(e){
setProfileData( (prevState) =>({

  ...prevState , 
  [e.target.id] :e.target.value, 

})
)

}


// to update the users document with name of user (to apply change)


 async function onSubmit(){

  const userRef = doc(db, "users" , user.uid);
  try {
    
    if(user.displayName !== name)


// update in auth
    await updateProfile(auth.currentUser, {
      displayName: name,
    });

// update in firestore
    await  updateDoc( userRef, {
       name, 
    });

    toast.success("Profile Updated successfully !");

  } 
  catch (error) {
    console.log(error);
  }
}


// fetch data from a document in a collection in firebase 
useEffect(()=>{

async  function fetchBlogs(){

  const blogRef = collection( db , "blogs");
  const q = query(blogRef , where("useRef" , "==" , auth.currentUser.uid) , orderBy("timestamp" ,"desc"));
  const querySnapshot = await getDocs(q);
  let blogs =[];

  querySnapshot.forEach((doc)=>{

    return blogs.push(
      {
        id: doc.id,
        data : doc.data(),
      }
    );

  });

setBlogs(blogs);
console.log(blogs);


}
fetchBlogs();

},[auth.currentUser.uid]);



  return (
    <div className='w-full items-center flex flex-col'>
    {/* <button className="btn btn-primary " onClick={onLogout}>SIGN OUT <VscSignOut className='h-6 w-6 m-2'/></button> */}

<h1 className="normal-case text-3xl mt-3 font-bold">My Profile</h1>

      <div className=' flex flex-col  items-center justify-center bg-white p-4 mt-4 rounded-md shadow-sm hover:shadow-xl active:shadow-xl'>


            <input type="text" placeholder="Name"  id="name" value={name} disabled={!changeProfile} onChange={onChange} className="input input-ghost  border-orange-500 input-warning w-full max-w-xs mt-4 mb-4" />
            <input type="text" placeholder="Email address" id="email" disabled value={email} className="input input-ghost border-orange-500 input-warning w-full max-w-xs mt-4 mb-2" />
       
      
      <div className='flex flex-row mt-6 space-x-6 mb-4'>

      <button className="btn btn-primary  btn-outline" 
      onClick={()=>{ changeProfile && onSubmit(); 
        setChangeProfile((prevState) => !prevState)}}>{ changeProfile ? "APPLY CHANGE" : "EDIT PROFILE"}
      <LuEdit className='h-6 w-6 m-2'/>
      </button> 

      <button className="btn btn-error btn-outline " onClick={onLogout}>SIGN OUT <VscSignOut className='h-6 w-6 m-2'/></button> 

      </div>
      <button className="btn btn-primary mt-4 mb-4 "  onClick={()=>navigate("/publish-blogs")}>CREATE NEW BLOG <TfiWrite className='h-6 w-6 m-2' /> </button>
      
      </div>


    
      <div>
      { blogs.length >0 && (
<>
<h1 className='text-center mt-6 text-xl font-bold'>My Listings</h1>
<ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6'>
 { blogs.map((blog) => (
<BlogItem key={blog.id} id={blog.id} blog={blog.data}  />

  ))}
</ul>

</>

      )}
    </div>
     

    

    </div>
  )
}