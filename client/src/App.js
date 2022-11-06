import AuthModal from './AuthModal';
import AuthModalContext from './AuthModalContext';
import UserContext from './UserContext';
import BoardHeader from './BoardHeader';
import Header from './Header';
import PostForm from './PostForm';
import { useState, useEffect } from 'react';
import Post from './Post';


function App() {

  const [showAuthModal, setShowAuthModal] = useState(false);
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
    setCurrentUser({})
  }

  return (
    <AuthModalContext.Provider value={{show: showAuthModal, setShow: setShowAuthModal}}>
      <UserContext.Provider value={{...currentUser, logout, setCurrentUser}}>
          <Header />
          <AuthModal />
          <BoardHeader />
          <PostForm />
          <Post />
      </UserContext.Provider>
    </AuthModalContext.Provider>
  );
}

export default App;
