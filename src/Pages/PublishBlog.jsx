import React from 'react'
import {useNavigate} from 'react-router-dom'
export default function PublishBlog() {

    // const navigate = useNavigate();

  return (
    <main >
        <h1 className='text-3xl normal-case font-bold mt-3 ml-2'>Publish your blog  <span  className='text-orange-500'>(1/3)</span></h1>


        <div className='flex flex-col mt-6 ml-2 mx-auto'>
            
        <div class="form-control w-full max-w-xs">
  <label class="label">
    <span class="label-text text-2xl font-bold">Title </span>
  </label>
  <input type="text" placeholder="Enter the title of your article" class="input input-bordered w-full max-w-xs" />
</div>

        </div>
    </main>
  )
}
