import React from 'react'
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

export default function PublishBlog() {

    // const navigate = useNavigate();

    const [text, setText] = useState('');
    const [rows, setRows] = useState(1);


    const handleTitleChange = (event) => {
      const { value } = event.target;
      setText(value);
  
      // Calculate the number of rows based on the textarea's scroll height
      // const textareaLineHeight = 16; // Adjust this value to match your textarea's line-height
      const rowsToShow = Math.ceil( 0.8*value.length / event.target.cols) || 1;
      setRows(rowsToShow/2);
    };

    const handleKeyDown = (event) => {
      const { value } = event.target;
      if (event.key === 'Backspace') {
        // Calculate the number of rows based on the textarea's scroll height
        // const textareaLineHeight = 16; // Adjust this value to match your textarea's line-height
        const rowsToShow = Math.ceil( 0.8*value.length / event.target.cols) || 1;
        setRows(rowsToShow);
      }
    };
  

    const handleContentChange=(event)=>{
      const {Contentvalue} = event.target; 
      setText(Contentvalue);
    }

  return (
    <main >
        <h1 className='text-3xl normal-case font-bold mt-3 ml-2'>Publish your blog</h1>


        <div className='flex flex-col mt-6  mx-auto   w-2/3 border-4  '>
            
        <div class="form-control  flex flex-col   w-full  border-4">

 <textarea value={text}
      rows={rows}
      onChange={handleTitleChange}
      onKeyDown={handleKeyDown} className="textarea textarea-ghost focus:outline-0 focus:border-r-0 focus:border-y-0  focus:bg-base-200  focus:border-l-orange-500 focus:border-l-2 text-2xl font-semibold overflow-hidden" placeholder="Title">
</textarea>

<textarea 
      rows={rows}
      onChange={handleContentChange}
      onKeyDown={handleKeyDown} className="textarea mt-14 textarea-ghost focus:outline-0 focus:border-r-0 focus:border-y-0  focus:bg-base-200 focus:border-l-2 text-base font-semibold overflow-hidden" placeholder="Article">
</textarea>


</div>

        </div>


    </main>
  )
}
