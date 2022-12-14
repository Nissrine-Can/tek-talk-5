import React, { useState, useContext } from 'react'
import ClickOutHandler from 'react-clickout-handler';
import Input from './Input';
import Textarea from './TextArea';
import Button from './Button';
import PostFormModalContext from './PostFormModalContext';
import UserContext from './UserContext';
import AuthModalContext from './AuthModalContext';
import { useNavigate } from 'react-router-dom';
import { TopicContext } from './TopicContext';
// import Dropdown from './Dropdown';
// import SelectDropdown from './SelectDropdown';
import { Select, Option } from "@material-tailwind/react";


const PostFormModal = () => {

  const topicContext = useContext(TopicContext)

  // const [topics, setTopics] = useState([])

  // useEffect(() => {
  //   const token = localStorage.getItem('jwt');
  //   if(token) {

  //         fetch('/topics', {
  //           headers: {
  //             'Accept': 'application/json',
  //             'Content-Type': 'application/json',
  //             'Authorization': `bearer ${token}`
  //           }
  //         })
  //         .then(resp => resp.json())
  //         .then(data => {
  //           //console.log(data)
  //           setTopics(data)
  //         })
  //   }
  //  }, [])

    const modalContext = useContext(PostFormModalContext);
    const user = useContext(UserContext);
    const authModalContext =useContext(AuthModalContext);

    // const { topic } = useContext(TopicContext);

    const visibleClass = modalContext.show ? 'block' : 'hidden';


    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [errs, setErrs] = useState([]);

    const navigate = useNavigate();


    function createPost(e) { 
    e.preventDefault()
       
    const token = localStorage.getItem('jwt');
    if(token) {
        fetch('/posts', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `bearer ${token}`
            },
           body: JSON.stringify({
            title: title, 
            body: body,
            user_id: user.id,
            topic_ids: [parseInt(selectedTopic)]
           })
        })
        .then(resp => {
            if(resp.status === 401) {
              authModalContext.setShow('login')
             
            } else if (resp.status === 422){
              //throw new Error(resp.statusText)
              return resp.json().then(errors => {
                console.log(errors.errors)
                setErrs(errors.errors)
              }
                )
            } else {
              return resp.json()
            }
        })
        .then(data => {
        //   if(data.error) {
        //     console.log('data.err', data.error)
        //     //setErrs(data.errors)
        //     setTitle('')
        //     setBody('')
        //     setSelectedTopic('')
        //  } else{
          console.log(data);
          navigate(`/posts/${data.id}`)
          modalContext.setShow(false)
          setTitle('')
          setBody('')
          setSelectedTopic('')
          setErrs([])
         //}
           
         })
        //  .catch(errors => console.log(errors))



       }
      };


  return (
    <div className={'w-screen h-screen fixed top-0 left-0 z-20 flex ' + visibleClass} style={{backgroundColor: 'rgba(0, 0, 0, .8)'}}
    >
      <ClickOutHandler onClickOut={() => {}}>
       
        <div className='border border-app_dark-brightest w-3/4 md:w-1/2 bg-app_dark p-5 text-app_text self-center mx-auto rounded-md'>

            <h1 className='text-2xl mb-5'>Create a post</h1> 
            {errs && (
              <>
              <ul>
               {errs.map((error, index) => <li 
                                       key={index}
                                       className='text-red-600 m-3'
                                       > { error }</li>)}
              </ul>
              </>
             )}
            <Input 
               value={title}
               name= 'title'
              
               onChange={(e) => setTitle(e.target.value)}
               className='w-full mb-3' 
               placeholder='Title'/>
            <Textarea 
               value={body}
               name= 'body'
              
               onChange={(e) => setBody(e.target.value)}
               className='w-full mb-3' 
               placeholder='Post text' />
              <div className="w-72 mb-3">
                
              <Select 
                  onChange={(value) => {
                  setSelectedTopic(value)
                  }}
                  label="Select Topic">
                {topicContext.topics.map((topic) => (
                  <Option index={topic.id} value={`${topic.id}`} key={topic.id}>{topic?.name}</Option>
                 
                ))}
              </Select>

              </div>
               {/* <SelectDropdown 
                value={selectedTopic}
                setSelectedTopic={setSelectedTopic}
              
                selected
                /> */}
            {/* <Dropdown 
              value={selectedTopic}
              name= 'selectedTopic'
             
              onSelect={handleSelect}
            /> */}
            <div className='text-right'>
              <Button 
                outline={1}
                onClick={() => modalContext.setShow(false)}
                className='px-4 py-2 mr-3'
                >Cancel
                </Button>
              <Button 
                onClick={createPost}
                type='submit'
                className='px-4 py-2'
                >POST
                </Button>
            </div>
        </div>
   
       </ClickOutHandler>
        
    </div>
  )
}

export default PostFormModal