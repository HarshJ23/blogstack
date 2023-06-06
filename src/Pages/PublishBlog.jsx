import React from 'react'
import {useNavigate} from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import {v4 as uuidv4} from "uuid" ;
import {toast} from 'react-toastify';
import { serverTimestamp } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function PublishBlog() {

    // const navigate = useNavigate();

    // const [text, setText] = useState('');
const auth = getAuth();

    // all variables stored in "blogs" collection 
    const [blogData, setBlogData] = useState({
    category : "Sports" , 
    title: "",
    content:"",
    description:"",
    images:{}, 
  })
      //de-structuring the form data
    const { category , title , content , description , images } = blogData;

  const textareaRef = useRef(null);
const blogContent = true ;

  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   setText(value);


  //   if(id=="content"){
      
  //     adjustTextareaHeight();
  //   }


  // };

  function handleChange(e){
let boolean = null ; 

if(e.target.files)
{
  setBlogData((prevState) => ({
    ...prevState,
    images:e.target.files


  }))
}

// for text , boolean , numbers 
  if(!e.target.files)
  {
    setBlogData((prevState) => ({
      ...prevState,
      [e.target.id] : boolean ?? e.target.value ,
    }));
  }

  if(blogContent)
  {
      
    adjustTextareaHeight();
       }
}

 async function onSubmit(e){
  e.preventDefault();
  
console.log(blogData);

// whole code of storeImage function availaible on Firebase Docs : https://firebase.google.com/docs/storage/web/upload-files#full_example
async function storeImage(image){
    
  return new Promise((resolve,reject) => {
    const storage = getStorage(); 
    const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
    const storageRef = ref(storage,filename);
    const uploadTask = uploadBytesResumable(storageRef, image);

    // Listen for state changes, errors, and completion of the upload.

    uploadTask.on('state_changed' , (snapshot)=>{
       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       console.log('Upload is ' + progress + '% done');
       switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }

    },
    (error) =>{reject(error);},

    ()=>{
       // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
            {
              resolve(downloadURL);
              console.log(downloadURL);
            });
            // console.log(downloadURL);
    }
    );
    

  });

}

const imgUrls = await Promise.all(
  [...images].map((image)=> storeImage(image))).catch((error)=>{
    toast.error("Failed to upload images");
    return;
  });


  // create a copy of blogData 
  const blogDataCopy = {

    ...blogData, 
    imgUrls, 
    timestamp:serverTimestamp(),
    useRef: auth.currentUser.uid,
    Name: auth.currentUser.displayName, 
}

delete blogDataCopy.images;

// add new document with a document ID
const docRef = await addDoc(collection(db , "blogs") , blogDataCopy);
console.log("Document written with ID: ", docRef.id);

toast.success("Blog Published successfully");
console.log(blogDataCopy);
}



  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <main >
        <h1 className='text-3xl normal-case font-bold mt-4 ml-4'>Publish your blog</h1>


<form onSubmit = {onSubmit}>

<div className='flex flex-col sm:flex-row mt-6 w-full  border-4  '>
            
  <div class="form-control  flex flex-col  w-full  sm:w-2/3  border-4">
    <input type="text" placeholder="Title" id="title" value={title} onChange={handleChange} className="input input-ghost w-full focus:bg-base-200 focus:outline-0 focus:border-l-orange-500 border-2 font-semibold  sm:text-xl text-lg focus:border-y-0 focus:border-r-0" />
    <textarea 
          ref={textareaRef}
          value={content}
          id="content"
          onChange={handleChange}  className="textarea w-full  mt-12 textarea-ghost  focus:outline-0 focus:border-l-orange-500 border-2 focus:border-y-0   focus:border-r-0 focus:bg-base-200 focus:border-l-2 text-sm font-semibold overflow-hidden sm:text-base mb-4" placeholder="Start Crafting your thoughts ...">
    </textarea>
    <input type="text" id="description" placeholder="One line description so your readers know what your content is about" onChange={handleChange} className="input input-ghost w-full  focus:bg-base-200 focus:outline-0 focus:border-l-orange-500 border-2 font-semibold  sm:text-base text-xs focus:border-y-0 focus:border-r-0" />

  </div>


<div className='sm:ml-14  mt-4  mb-3 flex flex-col  items-center'>

<div className="form-control w-full max-w-xs mb-3">
  <label className="label">
    <span className="label-text">Content Category</span>
  </label>
  <select  id="category" className="select select-bordered focus:outline-0 hover:shadow-lg">
    <option id="Sports"  value={category}>Sports</option>
    <option id="Tech" value={category}>Tech</option>
    <option id="Politics" value={category}>Politics</option>
    <option id="Science" value={category}>Science</option>
    <option id="Entertainment" value={category}>Entertainment</option>
  </select>
</div>

<div className='mb-10'>
<label className="label">
    <span className="label-text">Select Thumbnail for your content (only 1)</span>
  </label>
<input type="file" id="images"  onChange={handleChange} className="file-input file-input-bordered file-input-primary w-full max-w-xs"  />
</div>


<button type="submit" className="btn btn-outline hover:bg-orange-500  border-orange-500 border-2 text-orange-500 hover:border-orange-500  sm:w-full  ">PUBLISH</button>


</div>

</div>

</form>

    </main>
  )
}
