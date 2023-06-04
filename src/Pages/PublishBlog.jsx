import React from 'react'
import {useNavigate} from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

export default function PublishBlog() {

    // const navigate = useNavigate();

    const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    const { value } = event.target;
    setText(value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <main >
        <h1 className='text-3xl normal-case font-bold mt-4 ml-4'>Publish your blog</h1>


<div className='flex flex-col sm:flex-row mt-6 w-full  border-4  '>
            
  <div class="form-control  flex flex-col  w-full  sm:w-2/3  border-4">
    <input type="text" placeholder="Title" className="input input-ghost w-full  transition ease-in-out  focus:bg-base-200 focus:outline-0 focus:border-l-orange-500 border-2 font-semibold  sm:text-xl text-lg focus:border-y-0 focus:border-r-0" />
    <textarea 
          ref={textareaRef}
          value={text}
          onChange={handleChange} className="textarea w-full  mt-12 textarea-ghost  focus:outline-0 focus:border-l-orange-500 border-2 focus:border-y-0   focus:border-r-0 focus:bg-base-200 focus:border-l-2 text-sm font-semibold overflow-hidden sm:text-base mb-4" placeholder="Start Crafting your thoughts ...">
    </textarea>
    <input type="text" placeholder="One line description so your readers know what your content is about" className="input input-ghost w-full  focus:bg-base-200 focus:outline-0 focus:border-l-orange-500 border-2 font-semibold  sm:text-base text-xs focus:border-y-0 focus:border-r-0" />

  </div>


<div className='sm:ml-14  mt-4  mb-3 flex flex-col  items-center'>

<div className="form-control w-full max-w-xs mb-3">
  <label className="label">
    <span className="label-text">Content Category</span>
  </label>
  <select className="select select-bordered focus:outline-0 hover:shadow-lg">
    <option>Sports</option>
    <option>Tech</option>
    <option>Politics</option>
    <option>Science</option>
    <option>Entertainment</option>
  </select>
</div>

<div className='mb-10'>
<label className="label">
    <span className="label-text">Select Thumbnail for your content (only 1)</span>
  </label>
<input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
</div>


<button className="btn btn-outline hover:bg-orange-500  border-orange-500 border-2 text-orange-500 hover:border-orange-500 w-full ">PUBLISH</button>


</div>

</div>


    </main>
  )
}
