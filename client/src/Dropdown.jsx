import React, { useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';

const Dropdown = () => {

    const [topics, setTopics] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selected, setSelected] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if(token) {
    
              fetch('/topics', {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `bearer ${token}`
                }
              })
              .then(resp => resp.json())
              .then(data => {
                //console.log(data)
                setTopics(data)
              })
        }
       }, [])
    
  return (
    <div className='w-full font-medium mb-3 h-30'>
       <div 
        onClick={() => setOpen(!open)}
        className={`bg-app_dark-brighter w-full p-2 flex items-center justify-between rounded-md ${!selected && 'text-gray-700'}`}>
         {selected 
            ? selected?.length > 20 
              ? selected?.substring(0, 20) + '...'
              : selected
            :  'Select Topic'}
         <BiChevronDown size={20} className={`${open && 'rotate-180'}`}/>
       </div>
       <ul className={`bg-app_dark-brighter mt-2 rounded-md overflow-y-auto ${open ? 'max-h-60' : 'max-h-0'}`}>
        <div className='flex items-center px-2 sticky top-0 bg-app_dark-brightest'>
            <AiOutlineSearch size={18} className='text-gray-700'/>
            <input
               onChange={(e) => setInputValue(e.target.value.toLowerCase())}
               value={inputValue}
               type='text'
               placeholder='Enter topic name'
               className= 'placeholder:text-gray-700 p-2 outline-none bg-app_dark-brightest'
             />
        </div>
         {
            topics.map((topic) => (
                <li key={topic?.id} 
                    className={`p-2 text-sm hover:bg-sky-600 hover:text-white 
                    ${
                        topic?.name?.toLowerCase() === selected?.toLowerCase() && 'bg-sky-600 text-white'
                    }
                    ${
                        topic?.name?.toLowerCase().startsWith(inputValue) 
                          ? 'block' 
                          : 'hidden'
                    }`}
                    onClick={() => {
                        if(topic?.name?.toLowerCase() !== selected.toLowerCase()){
                            setSelected(topic?.name);
                            setOpen(false);
                            setInputValue('')
                        }
                    }}
                    value={topic.id}
                    
                >{topic?.name}</li>
            ))
        }
        
       </ul>
    </div>
  )
}

export default Dropdown