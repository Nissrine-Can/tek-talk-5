import React, { useState, useEffect } from 'react'
import Post from './Post';
import Comments from './Comments';
import CommentForm from './CommentForm';


const PostShowPage = (props) => {

   const [post, setPost] = useState({});
   const [comments, setComments] = useState([]);

   useEffect(() => {
    const token = localStorage.getItem('jwt');
        if(token) {
        fetch(`/posts/${props.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(data => setPost(data))
        

        fetch(`/posts/${props.id}/comments`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
          }
         })
         .then(resp => resp.json())
         .then(data => {
          //console.log(data);
          setComments(data)
        })
      }
    
      }, [props.id])
    
   function addComment(comment) {
    setComments([comment, ...comments])
   }

  return (
    <>
    {post && (
              <Post {...post} open={true} />  
        )} 
        
        <hr className='border-app_border my-4'/>
        <CommentForm {...post} addComment={addComment} />
        <hr className='border-app_border my-4'/>
         {!!comments && (
            <Comments postId={post.id} comments={comments} />
         )}
          
    </>
  )
}

export default PostShowPage