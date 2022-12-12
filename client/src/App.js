import AuthModalContext from './AuthModalContext';
import UserContext from './UserContext';
import { useState, useEffect } from 'react';

import PostFormModalContext from './PostFormModalContext';
import Routing from './Routing';
import { TopicContextProvider } from './TopicContext';
import PostContext from './PostContext';
import './app.css'

function App() {

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPostFormModal, setShowPostFormModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  //const [topics, setTopics] = useState([]);

  const searchPosts = term => {
    fetch("/posts?search=" + term)
    .then(resp => resp.json())
    .then(data => setSearchResults(data))
  }

  

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if(token) {
      fetch('/get-current-user', {
       
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => setCurrentUser(data))
    };

      // fetch('/posts', {
      //       headers: {
      //         'Accept': 'application/json',
      //         'Content-Type': 'application/json',
      //         'Authorization': `bearer ${token}`
      //       }
      //     })
      //     .then(resp => resp.json())
      //     .then(data => {
      //       console.log(data)
      //       setPosts(data)
      //       //setFilteredPosts(data)
      //     })

  }, [])

  function logout(){

      localStorage.setItem('jwt', 'undefined');
      setCurrentUser({})
     
  }

  return (
    <AuthModalContext.Provider value={{show: showAuthModal, setShow: setShowAuthModal}}>
      <PostFormModalContext.Provider value={{show: showPostFormModal, setShow: setShowPostFormModal}}>
        
          <UserContext.Provider value={{...currentUser, logout, setCurrentUser}}>
          <TopicContextProvider>
            <PostContext.Provider value={{posts, setPosts, filteredPosts, setFilteredPosts, searchPosts, searchResults }}>
              
                <Routing/> 
              
            </PostContext.Provider>
            </TopicContextProvider>
          </UserContext.Provider>
        
      </PostFormModalContext.Provider>
    </AuthModalContext.Provider>
  );
}

export default App;
