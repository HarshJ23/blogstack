import React from 'react';
import {getAuth} from 'firebase/auth';
import { useLocation , Link } from 'react-router-dom';
import {CiShare1 , CiBookmark} from 'react-icons/ci';
import {BsBookmark , BsBookmarkFill} from 'react-icons/bs'
import {useState} from 'react';
import {toast} from 'react-toastify';

export default function BlogItem( {blog , id}) 
{
 const auth = getAuth();
 const location = useLocation();
 const [shareurl , setShareurl] = useState(false);

 function pathMatchRoute(route)
 {
   if(route === location.pathname ){
     return true;
   }
 }

 const handleShareClick = () => {
  const baseUrl = 'https://blogstack-harshj23.vercel.app';
  const url = `${baseUrl}/${blog.category}/${blog.title}/${id}`;
  
  navigator.clipboard.writeText(url)
    .then(() => {
      alert('URL copied to clipboard!');
    })
    .catch((error) => {
      console.error('Error copying URL to clipboard:', error);
    });
};





return (

    <li className='mb-4 mx-2 '>
      <Link className='contents' to={`/${blog.category}/${blog.title}/${id}`}>
      <div className="card  hover:cursor-pointer lg:card-side bg-base-200 hover:shadow-lg hover:scale-95 transition-scale duration-200 ease-in ">
  <figure><img src={blog.imgUrls} className='h-[200px] w-full sm:w-[200px] object-cover px-2 py-2' alt="Album"/></figure>
  <div className="card-body">
<div className='-mt-6 flex flex-row justify-between'>
    <span className=' text-xs font-semibold uppercase text-white bg-orange-500 p-1 rounded-md'>{blog.category}</span>
    <span>

        {!pathMatchRoute("/profile") && (
      <p className='font-semibold text-sm hover:cursor-pointer hover:underline'>

          -{auth.currentUser.displayName} 
      </p>

        )}
    </span>

</div>
      <h2 className="card-title ">{blog.title}</h2>
    <p className='text-sm'>{blog.description}</p>






<div className="card-actions justify-end">
      <ul className='flex flex-row space-x-10'>
        <li className="tooltip tooltip-bottom font-bold "data-tip="Bookmark"><BsBookmark  className=' h-5 w-5 font-bold'/></li>
        <li className="tooltip tooltip-bottom font-bold" data-tip="Share Link" onClick={handleShareClick}><CiShare1  className=' h-6 w-6 font-bold'/></li>
      </ul>
</div>
  </div>
</div>
</Link>
    </li>
  )
}
