import React, { useState, useEffect, useContext } from 'react'
import Post from './Post';
import Comments from './Comments';
import CommentForm from './CommentForm';
import UserContext from './UserContext';
import AuthModalContext from './AuthModalContext';

const PostShowPage = (props) => {

   const [post, setPost] = useState({});
   const [comments, setComments] = useState([]);
   //const [errMsg, setErrMsg] = useState('')

   const user = useContext(UserContext);

   //console.log('user', user)
 
   //const [score, setScore] = useState(0);
   const [hasVoted, setHasVoted] = useState(false);
   //const [voteIs, setVoteIs] = useState(false);

   const [voteUp, setVoteUp] = useState(null);
   const [VoteDown, setVoteDown] = useState(null);
 

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
          // if (resp.status === 400){
          //   //throw new Error(resp.statusText)
          //   return resp.json().then(errors => {
          //     console.log(errors.message);
          //     setErrMsg(errors.message);
          //   }
          //     )
          // } else {
            //return resp.json()
         // }
        //})
        .then(data => {
          console.log('show', data);
          setPost(data)
          setComments(data.comments)
        })
      }
    
      }, [])
    
   function addComment(comment) {
    setComments([comment, ...comments])
   }

   const authModalContext =useContext(AuthModalContext);

   
   function handleVoteUp() {
   const token = localStorage.getItem('jwt');
   if(token) {
   fetch('/votes', {
     method: "POST",
     headers: {
       'Accept': "application/json",
       'Content-Type': "application/json",
       'Authorization': `bearer ${token}`
     },
     body: JSON.stringify({
       post_id: post.id,
       user_id: user.id,
       upvote: true
     })
   }).then(resp => {
    if(resp.status !== 401) {
      return resp.json()
    } else {
      return authModalContext.setShow('login')
    }
   }).then(data => {
     console.log('voteUp', data)
     
     setPost({...post, 
        score: data.post.score,
        upvotes: data.post.upvotes
      })
     setVoteUp(data)
     setHasVoted(true)
     console.log('score', data.post.score)
    })
   }
  }

   function handleVoteDown() {
   const token = localStorage.getItem('jwt');
   if(token) {
   fetch('/votes/', {
     method: "POST",
     headers: {
       'Accept': "application/json",
       'Content-Type': "application/json",
       'Authorization': `bearer ${token}`
     },
     body: JSON.stringify({
       post_id: post.id,
       user_id: user.id,
       upvote: false
     })
   }).then(resp => {
    if(resp.status !== 401) {
      return resp.json()
    } else {
      return authModalContext.setShow('login')
    }
   }).then(data => {
    
    setPost({...post,
       score: data.post.score,
       downvotes: data.post.downvotes
      })
     console.log('voteDown', data)
     setVoteDown(data)
     setHasVoted(true)
    
   })
   }
 }

 

//  useEffect(() => {
  
//     if((post.upvotes || []).find(vote => vote.upvotes.user_id === user.id) || (post.downvotes || []).find(vote => vote.downvotes.user_id === user.id)) {
    
//       setHasVoted(true)
//     } 
//         if((post.upvotes || []).find(vote => vote.upvotes.user_id === user.id)){
//            setVoteIs(true)
//         }
  
// }, [post.upvotes, post.downvotes, user])



// let classNames = 'inline-block h-4 relative top-1 ';
// if (hasVoted || voteIs) {
//   classNames += ' text-sky-600';
// } else {
//   classNames += ' text-reddit_text-darker hover:text-white';
// }
 let classNames = 'inline-block h-4 relative top-1 text-reddit_text-darker hover:text-white'

  return (
    <>
    {post && (
              <>
              <Post {...post} open={true} />
              <div className='inline-block'>
        <button 
            onClick={() => {
              handleVoteUp() 
              
            }}
            
            className={classNames}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
        </button>

    <div className='text-app_text-darker inline-block mx-1'>{post.score}</div>

    <button 
        onClick={() => handleVoteDown()}
        className={classNames}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
        className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
    </button>

    </div>
   </>  
  )} 
       {user.username && (
        <>
           <hr className='border-app_border my-4'/>
           
           <CommentForm {...post} addComment={addComment} />
          
        
        </>
       )}
       
        {/* <hr className='border-app_border my-4'/>
        <CommentForm {...post} addComment={addComment} />
         */}

        
        <hr className='border-app_border my-4'/>
        
         {!!comments && (
            <Comments postId={post.id} comments={comments} />
         )}


          
    </>
  )
}

export default PostShowPage