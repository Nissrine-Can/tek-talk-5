import React from 'react'
import { Link } from 'react-router-dom';
import PostContent from './PostContent';



const Post = (props) => {

    let postClasses = 'block border rounded-md ' + (props.open ? '' : 'hover:border-app_text cursor-pointer')

    if(props.isListing) {
      postClasses += ' bg-app_dark-brighter p-3 mx-6 border border-app_border'
    } else {
      postClasses += 'border-none'
    }

  return (
    <div className='text-app_text pb-4'> 
        {props.open && (
          <div className={postClasses}>
            <PostContent {...props} />
          </div>
        )}
        {!props.open && (
          <Link to={{pathname:'/posts/'+props.id}} state={{postId: props.id}} className={postClasses}> 
            <PostContent {...props} />
          </Link>
        )}
        
      </div>
  )
}

export default Post