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


export default function BlogItem( {blog , id}) {
   







  return (
    <div>
      <div className="card lg:card-side bg-base-100 shadow-xl">
  <figure><img src={blog.imgUrls} alt="Album"/></figure>
  <div className="card-body">
    <h2 className="card-title">{blog.title}</h2>
    <p>Click the button to listen on Spotiwhy app.</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Listen</button>
    </div>
  </div>
</div>
    </div>
  )
}
