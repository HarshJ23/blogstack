import { useParams } from 'react-router';
import { useEffect , useState } from 'react';
import {db} from '../firebase';
import {doc , getDoc} from 'firebase/firestore';
import {CiShare1 , CiEdit} from 'react-icons/ci';
import {MdDelete} from 'react-icons/md';
import {BsBookmark , BsBookmarkFill} from 'react-icons/bs';
import { getAuth } from 'firebase/auth';
import {toast} from 'react-toastify';


export default function BlogPage() {

  const params = useParams();
  const [blog , setBlog] = useState(null);
  const auth = getAuth();


// fetch the blog data
useEffect(()=>{
  async function fetchBlog(){
    const docRef = doc(db , "blogs" , params.blogId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      setBlog(docSnap.data());
    }

  }

  fetchBlog();

},[params.blogId])



const handleShareClick = () => {
  const baseUrl = 'https://blogstack-harshj23.vercel.app';
  const url = `${baseUrl}/${blog.category}/${blog.title}/${params.blogId}`;
navigator.clipboard.writeText(url)
    .then(() => {
     toast.success("Link copied to clipboard");
    })
    .catch((error) => {
     toast.error(error);
    });


};
// console.log(blog);

  return (
    <main className='w-full sm:w-2/3 mx-auto my-4 px-3  border-2 '>

      {blog && (

<>
        <div
                className="relative w-full overflow-hidden h-[300px] py-2 "
                style={{
                  background: `url(${blog.imgUrls}) center no-repeat `,
                  backgroundSize: "cover",
                }}
                ></div>
  
        <h2 className='font-bold text-xl my-4 sm:text-3xl'>{blog.title}</h2>

<div className='flex flex-row items-center justify-between'>

  <div className='flex flex-col space-y-4'>
       <p className='text-base italic'>{blog.description}</p>
       <p className='font-semibold text-sm hover:cursor-pointer hover:text-orange-500'>- {auth.currentUser.displayName} <span className=' text-xs font-semibold uppercase text-white bg-orange-500 p-1 ml-6 rounded-md hover:no-underline'>{blog.category}</span></p>
  </div>
  <ul  className='flex flex-row space-x-5 items-center hover:cursor-pointer'>
    <li className="tooltip tooltip-bottom font-bold" data-tip="Bookmark"><BsBookmark  className=' h-5 w-5 '/></li>
    <li className="tooltip tooltip-bottom font-bold" data-tip="Share Link" onClick={handleShareClick}><CiShare1 className=' h-6 w-6 '/></li>
  </ul>


</div>

<p className='leading-8 my-4 font-normal p-3'>{blog.content}</p>

</>
      )}
      

    </main>
  )
}
