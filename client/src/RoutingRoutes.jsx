import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Board from './Board';
import PostModal from './PostModal';
import PostPage from './PostPage';
import SearchResultPage from './SearchResultPage';


const RoutingRoutes = () => {

  const [postOpen, setPostOpen] = useState(false)
  //const [postId, setPostId] = useState(null)

  const location = useLocation()

  let postId = null;

  if (location.state && location.state.postId) {
    location.pathname = '/'
    if (postOpen) {
      postId = location.state.postId;
    } else {
      location.state.postId = null;
    }
  }
  //console.log(location)

  useEffect((postOpen) => {
    setPostOpen(true)
    postOpen = null
  }, [postId, postOpen])
  
  return (
    <div>
      {postId && (
        <div>
          <PostModal 
            id={postId} 
            open={postOpen}
            onClickOut={() => setPostOpen(false)}
          />
        </div>
      )}
      <Routes location={location}>
          <Route path='/' element={<Board />} />
          <Route path='/topics/:name' element={<Board />} />
          <Route path='/posts/:id' element={<PostPage />}/>
          <Route path='/search/:text' element={<SearchResultPage />} />
          
      </Routes>
    </div>
  )
}

export default RoutingRoutes