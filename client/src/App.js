import AuthModalContext from './AuthModalContext';
import UserContext from './UserContext';
import { useState, useEffect } from 'react';

import PostFormModalContext from './PostFormModalContext';
import Routing from './Routing';
import { TopicContextProvider } from './TopicContext';


function App() {

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPostFormModal, setShowPostFormModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  

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

  }, [])

  function logout(){

      localStorage.setItem('jwt', 'undefined');
      setCurrentUser({})
     
  }

  return (
    <AuthModalContext.Provider value={{show: showAuthModal, setShow: setShowAuthModal}}>
      <PostFormModalContext.Provider value={{show: showPostFormModal, setShow: setShowPostFormModal}}>
        <TopicContextProvider>
          <UserContext.Provider value={{...currentUser, logout, setCurrentUser}}>
           
              <Routing/> 
           
          </UserContext.Provider>
        </TopicContextProvider>
      </PostFormModalContext.Provider>
    </AuthModalContext.Provider>
  );
}

export default App;
