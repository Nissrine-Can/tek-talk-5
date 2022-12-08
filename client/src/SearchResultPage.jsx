import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import Post from './Post';


const SearchResultPage = () => {
    const {text} = useParams()
    
    const [posts, setPosts] = useState([]);
    useEffect(() => {
     const token = localStorage.getItem('jwt');
     if(token) {
 
         fetch('/posts?search='+text, {
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
    }, [text])
 
   return (
     <div className='bg-app_dark px-6'> 
             {posts.map(post => (
                <Post key={post.id} {...post} isListing={true} />
             ))}
           </div>
           
   )
}

export default SearchResultPage