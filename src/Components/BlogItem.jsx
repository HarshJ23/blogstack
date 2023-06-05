import React from 'react'
import { db } from "../firebase";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where,
  } from "firebase/firestore";
import { LuDice1 } from 'react-icons/lu';


export default function BlogItem( {blog , id}) {
   







  return (

    <li className='mb-4 mx-2 '>
      <div className="card  hover:cursor-pointer lg:card-side bg-base-200 hover:shadow-lg hover:scale-95 transition-scale duration-200 ease-in ">
  <figure><img src={blog.imgUrls} className='h-[200px] w-full sm:w-[200px] object-cover px-2 py-2' alt="Album"/></figure>
  <div className="card-body">
    <div>
    <span className=' text-xs font-semibold uppercase text-white bg-orange-500 p-1 rounded-md'>{blog.category}</span>

    </div>
      <h2 className="card-title ">{blog.title}</h2>
    <p className='text-sm'>{blog.description}</p>
    <div className="card-actions justify-end">
      {/* <button className="btn btn-outline hover:bg-orange-500  border-orange-500 border-2 text-orange-500 hover:border-orange-500">READ MORE</button> */}
    </div>
  </div>
</div>
    </li>
  )
}
