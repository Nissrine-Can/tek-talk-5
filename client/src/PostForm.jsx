import React from 'react'
import avatar from './avatar.png';


const PostForm = () => {
  return (
    <div>
        <div className='bg-app_dark px-6 py-4 text-gray-400'> 

            <div className='border border-app_border p-2 rounded-md flex bg-app_dark-brighter'> 

                <div className='rounded-full bg-gray-600 overflow-hidden w-10 h-10'> 
                    <img src={avatar} alt='' style={{filter:'invert(100%)'}} className='block'/>
                </div>

                <form 
                    action='' 
                    className='flex-grow bg-app_dark-brightest border border-app_border ml-4 mr-2 rounded-md'
                    >
                    <input 
                        className='p-2 px-3 text-sm bg-app_dark-brightest block w-full rounded-md'
                        type='text'
                        placeholder='New post'
                        />
                </form>

            </div>

        </div>

    </div>
  )    
}

export default PostForm