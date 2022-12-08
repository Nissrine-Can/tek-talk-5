import React, { useState, useEffect, useContext } from 'react'
import Post from './Post';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
//import { TopicContext } from './TopicContext';

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [topics, setTopics] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    //const {topic} = useContext(TopicContext)
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
            setPosts(data)
            setFilteredPosts(data)
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

   const topicStyles = 'm-3'

   const topicList = topics.map((topic) => (
      <Link key={topic.id} to={`/topics/${topic.name}`}><li className={topicStyles}>{topic.name}</li></Link>
   ))

  return (
    <div className='flex flex-row bg-app_dark'>
      <div className='px-6'> 
        {posts.map(post => (
          <Post key={post.id} {...post} isListing={true} />
            ))}
      </div>
      
      <div className='border border-app_border rounded-md bg-app_dark-brighter mr-10 w-2/3 text-app_text'>
          <h2 className='text-xl m-3'>Topics</h2>
          <hr className='border-app_border my-4'/>
          <ul>{topicList}</ul>
      </div>
      
    </div>
          
  )
}

export default PostsList