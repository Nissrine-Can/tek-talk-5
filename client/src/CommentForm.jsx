import React, { useContext, useState } from 'react'
import TextArea from './TextArea';
import Button from './Button'
import UserContext from './UserContext';



const CommentForm = (props) => {
    const userInfo = useContext(UserContext);
    const [commentBody, setCommentBody] = useState('');

    

    const postComment = (e) => {
      e.preventDefault();
      const token = localStorage.getItem('jwt');
      if(token) {
      fetch(`/posts/${ props.id }/comments`, {
        method: "POST",
        headers: {
          'Accept': "application/json",
          'Content-Type': "application/json",
          'Authorization': `bearer ${token}`
        },
        body: JSON.stringify({
          body: commentBody,
          user_id: userInfo.id
        })
      })
      .then(resp => resp.json())
      .then(data => {
        //console.log(data)
        setCommentBody('')
        props.addComment(data)
      })
      }
    }
  return (
    <div>
        <div className='text-app_text'>
        {userInfo.username && (
            <div className='mb-3'>
                Comment as {userInfo.username}
            </div>
        )}
        </div>
        <form onSubmit={e => postComment(e)}>
          <TextArea 
             className='w-full mb-3 border border-app_border'
             placeholder='Your comment.' 
             value={commentBody}
             onChange={e => setCommentBody(e.target.value)}
            />
          <div className='text-right'>
            <Button 
               className='p-2'
            >Comment</Button>
          </div>
        </form>
    </div>
  )
}

export default CommentForm