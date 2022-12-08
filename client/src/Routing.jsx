import React from 'react'

import AuthModal from './AuthModal'
import Header from './Header'
import PostFormModal from './PostFormModal'


import RoutingRoutes from './RoutingRoutes';
import TopicFormModal from './TopicFormModal';

const Routing = () => {

  


  return (

      <>
        <Header />
        <RoutingRoutes />
        <PostFormModal />
        <TopicFormModal />
        <AuthModal />
       </>
                               
  )
}

export default Routing