import React from 'react'
import TimeAgo from 'timeago-react';

const Comments = (props) => {
  const filteredComments = props.comments.filter(comment => comment.post.id === props.postId);

 

  return (
    <div className='mb-2 text-app_text'>
      {filteredComments.map(comment => (
        
        <div className='mb-3' key={comment.id}>
          <div className='flex mb-2'>
          <div className='bg-app_text w-10 h-10 rounded-full mr-2'/>
          <div className='leading-10 px-2 text-lg font-sans'>{comment.user?.username}</div>
          <div className='leading-10 px-2 text-md font-sans' ><TimeAgo datetime={comment.posted_at}/></div>
          </div>
          
          <div className='border-l-2 border-app_text-darker p-3 ml-4'> 
              {comment.body}
          </div> 
        </div>

      ))}
    </div>
  )
}

export default Comments