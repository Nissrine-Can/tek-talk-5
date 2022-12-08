import React, { useContext, useState, useEffect } from 'react'
import UserContext from './UserContext';

const Voting = ({post}) => {

  const user = useContext(UserContext);
 
  const [score, setScore] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteIs, setVoteIs] = useState(false);


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
      }) 
      .then(resp => resp.json())
      .then(data => {
        console.log('upvote', data)
        
        setScore(data.post.score)
        console.log('upvote', data.post.score)
        
      })
      
      }
       
    }
    function handleVoteDown() {
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
          upvote: false
        })
      })
      .then(resp => resp.json())
      .then(data => {
       
        setScore(data.post.score)
        console.log('downvote', data.post.score)
        //setHasVoted(true)
       
      })
      }
    }



    useEffect(() => {
      if(post.upvotes.find(vote => vote.user_id === user.id) || post.downvotes.find(vote => vote.user_id === user.id)) {
        
        setHasVoted(true)
      } 
          if(post.upvotes.find(vote => vote.user_id === user.id)){
             setVoteIs(true)
          }
            

    }, [post.upvotes, post.downvotes, user])

   

    

    // let classNames = 'inline-block h-4 relative top-1 ';
    // if (voteIs){
    //   classNames += ' text-sky-600';
    // } else {
    //   classNames += ' text-reddit_text-darker hover:text-white';
    // }

    let classNames = 'inline-block h-4 relative top-1 text-reddit_text-darker hover:text-white'
    
  return (
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
  )
}

export default Voting