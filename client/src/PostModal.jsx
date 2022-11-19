import React, { useState, useEffect } from 'react'
import PostShowPage from './PostShowPage';
//import PostContent from './PostContent'
import ClickOutHandler from 'react-clickout-handler';
//import CommentForm from './CommentForm';
//import Comments from './Comments'


const PostModal = (props) => {
   //console.log(props)

   const [post, setPost] = useState({});
   //const [comments, setComments] = useState([]);

   const visibleClass = props.open ? 'block' : 'hidden';

   

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
        

        // fetch(`/posts/${props.id}/comments`, {
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Authorization': `bearer ${token}`
        //   }
        //  })
        //  .then(resp => resp.json())
        //  .then(data => {
        //   //console.log(data);
        //   setComments(data)
        // })
      }
    
      }, [props.id])

    function close() {
        setPost({})
        props.onClickOut()
    }
    
  //  function addComment(comment) {
  //   setComments([comment, ...comments])
  //  }

  return (
    <div className={'w-screen h-screen fixed top-0 left-0 z-30 flex ' + visibleClass}
    style={{backgroundColor: 'rgba(0, 0, 0, .8)'}}>
     <ClickOutHandler onClickOut={() => {close()}}>
        <div className='border border-app_dark-brightest my-4 w-3/4 md:w-1/2 bg-app_dark-brighter text-app_text self-center mx-auto p-4 rounded-md'>
            
            <div className='block overflow-scroll' style={{maxHeight:'calc(100vh - 50px)'}}>
              <PostShowPage post={post} id={props.id} />
                {/* <PostContent open={true} {...post} /> 
                <hr className='border-app_border my-4'/>
                
                    <CommentForm {...post} addComment={addComment} />
                    <hr className='border-app_border my-4'/>
                    
                        {!!comments && (
                          <Comments postId={post.id} comments={comments} />
                        )}      */}
                
            </div>
        </div>
      </ClickOutHandler>
    </div>
  )
}

export default PostModal