import React, { useState, useEffect, useContext } from 'react'
import Post from './Post';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
//import { TopicContext } from './TopicContext';
import PostContext from './PostContext';


const PostsList = () => {
    // const [posts, setPosts] = useState([]);
    const [topics, setTopics] = useState([]);
    // const [filteredPosts, setFilteredPosts] = useState([]);

    //const {topic} = useContext(TopicContext)

    const postContext = useContext(PostContext)

    const {name} = useParams()


   useEffect(() => {
    const token = localStorage.getItem('jwt');
    if(token) {

      let url = '/posts'
      if(name){
        url += '?name=' + name
      }

        fetch(url, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `bearer ${token}`
            }
          })
          .then(resp => resp.json())
          .then(data => {
            console.log(data)
            postContext.setPosts(data)
            postContext.setFilteredPosts(data)
          })

        



          fetch('/topics', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `bearer ${token}`
            }
          })
          .then(resp => resp.json())
          .then(data => {
            console.log(data)
            setTopics(data)
          })
    }
   }, [name])

   

   const topicList = topics.map((topic) => (
      <Link key={topic.id} to={`/topics/${topic.name}`}><li className={'m-3 text-blue-400 hover:underline hover:text-blue-800 active:text-white active:font-bold'}
      >{topic.name}</li></Link>
   ))

  return (
    <div className='flex flex-row bg-app_dark'>
       <div className='border border-app_border rounded-md bg-app_dark-brighter w-96 ml-10 text-app_text'>
          <h2 className='text-xl m-3'>Topics</h2>
          <hr className='border-app_border my-4'/>
          <ul>{topicList}</ul>
      </div>
      
      <div className='px-6'> 
        {postContext.filteredPosts.length === 0 ? <h1 className='text-white text-xl pl-8'>There are no posts on this topic. Be the first one to post!</h1> : postContext.filteredPosts.map(post => (
          <Post key={post.id} {...post} isListing={true} />
            ))}
      </div>
      
      
      
    </div>
          
  )
}

export default PostsList