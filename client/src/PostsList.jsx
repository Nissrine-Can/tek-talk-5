import React, { useState, useEffect } from 'react'
import Post from './Post';

const PostsList = () => {
    const [posts, setPosts] = useState([]);
   useEffect(() => {
    const token = localStorage.getItem('jwt');
    if(token) {

        fetch('/posts', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `bearer ${token}`
            }
          })
          .then(resp => resp.json())
          .then(data => {
            //console.log(data)
            setPosts(data)
          })
    }
   }, [])

  return (
    <div className='bg-app_dark px-6'> 
            {posts.map(post => (
               <Post key={post.id} {...post} isListing={true} />
            ))}
          </div>
          
  )
}

export default PostsList