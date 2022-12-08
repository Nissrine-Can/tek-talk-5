import React from 'react'
import BoardHeader from './BoardHeader'
import PostForm from './PostForm'
import PostsList from './PostsList'
//import { useParams } from 'react-router-dom';
//import { TopicContext } from './TopicContext';

const Board = () => {
  //const { name } = useParams();
  
  
  //console.log("topicnameFromUrl", name);
  //const {topic, setTopic} = useContext(TopicContext);

  // useEffect(() =>{
  //    setTopic(name);
     
  // }, [name, topic, setTopic])

  return (
    <div>
        <BoardHeader />
        <PostForm />
        <PostsList />
    </div>
  )
}

export default Board