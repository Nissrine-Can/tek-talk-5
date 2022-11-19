import React from 'react'
import BoardHeader from './BoardHeader'
import PostForm from './PostForm'
import PostsList from './PostsList'

const Board = () => {
  return (
    <div>
        <BoardHeader />
        <PostForm />
        <PostsList />
    </div>
  )
}

export default Board