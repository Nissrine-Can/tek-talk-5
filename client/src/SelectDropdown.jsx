import React, {useEffect, useState} from 'react'
import { Select, Option } from "@material-tailwind/react";


const SelectDropdown = ({setSelectedTopic}) => {

  const [topics, setTopics] = useState([])

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
    <div className="w-72">
      <Select onChange={(e) => setSelectedTopic(e)}
                label="Select Topic">
        {topics.map((topic) => (
          <Option index={topic.id} value={topic.name} key={topic.id}>{topic?.name}</Option>
        ))}
       
      </Select>
    </div>
  );
}
  


export default SelectDropdown