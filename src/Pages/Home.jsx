import {TfiWrite} from 'react-icons/tfi';
import { useNavigate } from 'react-router';
import React, { useEffect , useState} from 'react'
import { doc,   orderBy } from "firebase/firestore";
import {db} from '../firebase'
import { collection, query, where, getDocs } from "firebase/firestore";
import BlogItem from '../Components/BlogItem';


export default function Home() {

  const navigate = useNavigate();
  const [techBlogs , setTechBlogs] = useState(null);



// fetch blogs in tech 
useEffect(()=>{

  async function fetchTech(){
    const blogRef = collection(db , "blogs");
    const q = query(blogRef , where("category" , "==" , "Science and tech") , orderBy("timestamp" , "desc"));
    const querySnapshot = await getDocs(q);
    let techBlogs =[];
    querySnapshot.forEach((doc)=>{

      return techBlogs.push(
        {
          id: doc.id,
          data : doc.data(),
        }
      );
  
    });
setTechBlogs(techBlogs);
console.log(techBlogs);
  }

  fetchTech();

},[])


  return (
    <div className='px-3'>
    <div className="hero min-h-16 bg-white border-2  py-6 my-4 ">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-3xl font-bold">Discover best content</h1>
      <p className="py-6">A perfect platform to Create and Discover new content, category wise</p>
<div className='flex flex-row justify-center space-x-4'>
      <button className="btn btn-primary "  onClick={()=>navigate("/publish-blogs")}>CREATE NEW BLOG <TfiWrite className='h-6 w-6 m-2' /> </button>
      <button className="btn btn-primary " >DISCOVER</button>
</div>
    </div>
  </div>
</div>

<section>
  <div>
      <div>
      { techBlogs && techBlogs.length > 0 && (
        
        <>
        <h2 className='font-bold text-xl'>Recent in Tech</h2>
        <p className='text-sm hover:text-orange-500 hover:cursor-pointer'>Show more in Tech</p>
<ul className="sm:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 my-3">
    {techBlogs.map((blog) => (
      <BlogItem
        key={blog.id}
        id={blog.id}
        blog={blog.data}
      />
    ))}
  </ul>
</>

)}
      </div>
  </div>
</section>


    </div>
  )
}
