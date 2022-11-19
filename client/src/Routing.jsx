import React from 'react'
//import { BrowserRouter as Router } from 'react-router-dom';
import AuthModal from './AuthModal'
import Header from './Header'
import PostFormModal from './PostFormModal'
import RoutingRoutes from './RoutingRoutes';

const Routing = () => {
  return (
    <>
        <Header />
        <RoutingRoutes />
        <PostFormModal />
        <AuthModal />
    </>
                    
                    
  )
}

export default Routing