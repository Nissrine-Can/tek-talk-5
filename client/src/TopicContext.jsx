import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
export const TopicContext = React.createContext({})

export function TopicContextProvider({children}) {
    const [show, setShow] = useState(false);
    const [topic, setTopic] = useState(null);
    const [topicInfo, setTopicInfo] = useState({});

    const [topics, setTopics] = useState([])

    const { name } = useParams();
    useEffect(() => {
       if(!name){
        return;
       }
       const token = localStorage.getItem('jwt');
            if(token) {
            fetch(`/topics/${name}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                  }
            })
            .then(resp => resp.json())
            .then(data => {
                console.log('communityDetails', data)
                setTopicInfo(data)
            })

            
    }
    }, [name, topic])

    return (
        <TopicContext.Provider value={{topics, setTopics, show, setShow, topic, setTopic, ...topicInfo}} >
           {children}
        </TopicContext.Provider>
    )
}