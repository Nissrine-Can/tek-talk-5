import React, { useContext } from 'react'
//import {useParams} from 'react-router-dom';
import Post from './Post';
import PostContext from './PostContext';


const SearchResultPage = () => {
    //const {text} = useParams()

    const postContext = useContext(PostContext)
    
    // const [searchResults, setSearchResults] = useState([]);
    // useEffect(() => {
    //  const token = localStorage.getItem('jwt');
    //  if(token) {
 
    //      fetch('/posts?search=' + text, {
    //          headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json',
    //            'Authorization': `bearer ${token}`
    //          }
    //        })
    //        .then(resp => resp.json())
    //        .then(data => {
    //          console.log(data, "hi")
    //          postContext.setSearchResults(data)
             
    //        })
    //  }
    // }, [text, postContext])
 
   return (
     <div className='bg-app_dark px-6'> 
             {postContext.searchResults.map(result => (
                <Post key={result.id} {...result} isListing={true} />
             ))}
           </div>
           
   )
}

export default SearchResultPage