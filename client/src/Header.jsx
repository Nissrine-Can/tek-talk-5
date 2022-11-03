import React from 'react'
import { HiOutlineCode,
         HiSearch,
         HiOutlineBell,
         HiOutlineChat,
         HiPlusSm,
         HiChevronDown
        } from "react-icons/hi";
import avatar from './avatar.png';

const Header = () => {
  return (
    <div>
        <header className='w-full bg-app_dark p-2'>

            <div className='mx-4 flex'>

                <HiOutlineCode className='w-8 h-8 mr-4 text-white' />

                <form action='' className='bg-app_dark-brighter px-3 mx-4 flex rounded-md border border-app_border flex-grow'>

                    <HiSearch className='text-gray-300 h-6 w-6 mt-1'/>

                    <input
                        className='bg-app_dark-brighter text-sm text-white p-1 pl-2 pr-0 block focus:outline-none' 
                        type='text' 
                        placeholder='Search'
                    />

                </form>

                <button className='px-2 py-1'>
                    <HiOutlineBell className='text-gray-400 w-6 h-6 mx-2'/>
                </button>
                <button className='px-2 py-1'>
                    <HiOutlineChat className='text-gray-400 w-6 h-6 mx-2'/>
                </button>
                <button className='px-2 py-1'>
                    <HiPlusSm className='text-gray-400 w-6 h-6 mx-2'/>
                </button>

                <button className='rounded-md flex ml-4'>
                  <div className='w-8 h-8 bg-gray-600 rounded-md'> 
                    <img src={avatar} alt='' style={{filter:'invert(100%)'}} className='block'/>
                  </div>
                  <HiChevronDown className='text-gray-500 w-5 h-5 mt-2 ml-1'/>
                </button>

            </div>

        </header>
    </div>
  )
}

export default Header