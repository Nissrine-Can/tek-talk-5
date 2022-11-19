import React from 'react';
import PostShowPage from './PostShowPage';
import { useParams } from 'react-router-dom';


const PostPage = () => {

  const { id } = useParams();

    
 return (
    <div className='bg-app_dark py-4 px-6'>
        <div className='bg-app_dark-brighter p-3 rounded-md'> 
          <PostShowPage  id= {id}/>
        </div>
    </div>
  )
}

export default PostPage;