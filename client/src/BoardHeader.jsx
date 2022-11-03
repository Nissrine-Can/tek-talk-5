import React from 'react'
import {HiDesktopComputer} from "react-icons/hi";

const BoardHeader = () => {
  return (
    <div>
        <div className="h-20 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
      
     
      <div className="bg-app_dark-brighter relative">
        <div className='mx-6 relative flex'> 
          <HiDesktopComputer className="h-20 w-20 bg-gray-200 overflow-hidden rounded-full relative -top-3 m-1 border-4 border-white text-gray-800"/>

          <div className='pt-2 pl-4'> 
            <h1 className='text-gray-300 text-3xl'>TekTalk</h1>
            <h5 className='text-gray-500'>Lorem Ipsum</h5>
          </div>

        </div>
      </div>
      

    </div>
  )
}

export default BoardHeader