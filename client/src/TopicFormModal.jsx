import React, { useContext, useState } from 'react'
import Input from './Input';
import Button from './Button';
import PopUp from './PopUp';
//import UserContext from './UserContext';
import { TopicContext } from './TopicContext';
import { useNavigate } from 'react-router-dom';


const TopicFormModal = () => {
    //const user = useContext(UserContext);
    //const topicContext = useContext(TopicContext);

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [errMsgs, setErrMsgs] = useState([]);

    const {show, setShow} = useContext(TopicContext);
    if(!show){
        return null;
    }
    

    function createPost(){
        const token = localStorage.getItem('jwt');
        if(token) {
        fetch('/topics', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `bearer ${token}`
            },
           body: JSON.stringify({
            name: name,
            //user_id: user.id
        })
        })
        .then(resp => {
            if(resp.status !== 404) {
                return resp.json()
              } else {
                throw new Error(resp.statusText)
              }
        })
        .then(data => {
            if(data.errors) {
                console.log('data.err', data.errors)
                setErrMsgs(data.errors)
                setName('');
             } else{
                console.log(data);
            // topicContext.setTopics({...topicContext.topics, data})
            navigate(`/topics/${name}`)
            
            setShow(false)
            setName('')
            setErrMsgs([])
            
            }

         })
         
    }
    }

  return (
    <PopUp open={show} onClickOut={() => setShow(false)}>
        <h1 className='text-2xl mb-5'>Create a topic</h1> 
        {errMsgs && (
              <>
              <ul>
               {errMsgs.map((error, index) => <li 
                                       key={index}
                                       className='text-red-600 m-3'
                                       > { error }</li>)}
              </ul>
              </>
             )}
        <Input
           value={name}
           onChange={(e) => setName(e.target.value)}
           placeholder='name'
           className='w-full'
         />
        <div className='text-right pt-4'>
            <Button 
                outline={1}
                onClick={() => setShow(false)}
                className='px-4 py-2 mr-3'
                >Cancel
            </Button>
            <Button 
               onClick={() => createPost()}
               className='px-6 py-2'>
                Create Your Topic!
            </Button>
            
        </div>
    </PopUp>
  )
}

export default TopicFormModal