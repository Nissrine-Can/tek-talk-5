import React, { useState, useContext } from 'react'
import ClickOutHandler from 'react-clickout-handler';
import { HiOutlineCode,
         HiSearch,
         HiOutlineBell,
         HiOutlineChat,
         HiPlusSm,
         HiChevronDown,
         HiOutlineUser,
         HiLogin,
         HiLogout
        } from "react-icons/hi";
import AuthModalContext from './AuthModalContext';
import avatar from './avatar.png';
import Button from './Button';
import UserContext from './UserContext';
import { Link } from 'react-router-dom';

const Header = () => {

  const [userDropdownVisibilityClass, setUserDropdownVisibilityClass] = useState('hidden')
  
  function toggleUserDropdown() {
    if (userDropdownVisibilityClass === 'hidden') {
       setUserDropdownVisibilityClass('block')
    } else {
       setUserDropdownVisibilityClass('hidden')
    }
  };

  const authModal = useContext(AuthModalContext);
  const user = useContext(UserContext);
  
  return (
    
      <header className='w-full bg-app_dark p-2'>

            <div className='mx-4 flex relative'>
              <Link to='/'>
                <HiOutlineCode className='w-8 h-8 mr-4 text-white' />
              </Link>
                <form action='' className='bg-app_dark-brighter px-3 mx-4 flex rounded-md border border-app_border flex-grow'>

                    <HiSearch className='text-gray-300 h-6 w-6 mt-1'/>

                    <input
                        className='bg-app_dark-brighter text-sm text-white p-1 pl-2 pr-0 block focus:outline-none' 
                        type='text' 
                        placeholder='Search'
                    />

                </form>

                {user.username && (
                  <>
                    <button className='px-2 py-1'>
                      <HiOutlineChat className='text-gray-400 w-6 h-6 mx-2'/>
                    </button>
                    <button className='px-2 py-1'>
                      <HiOutlineBell className='text-gray-400 w-6 h-6 mx-2'/>
                    </button>
                    <button className='px-2 py-1'>
                      <HiPlusSm className='text-gray-400 w-6 h-6 mx-2'/>
                    </button>
                  </>
                )}

                {!user.username && (
                   <div className='mx-2 hidden sm:block'> 
                      <Button 
                        outline='true' 
                        className='mr-1 h-8'
                        onClick={() => authModal.setShow('login')}
                      >Log In</Button>
                      <Button 
                        className='h-8'
                        onClick={() => authModal.setShow('register')}
                      >Sign Up</Button>
                 </div>
                )}
                
                

                <ClickOutHandler 
                    onClickOut={()=> setUserDropdownVisibilityClass('hidden')}>
                  <button 
                      className='rounded-md flex ml-4 border border-gray-700'
                      onClick={() => {toggleUserDropdown()}}
                  >
                    {!user.username && (
                      <HiOutlineUser className='w-6 h-6 m-1 text-gray-400'/>
                    )}
                    {user.username && (
                      <div className='w-8 h-8 bg-gray-600 rounded-md'> 
                         <img src={avatar} alt='' style={{filter:'invert(100%)'}} className='block'/> 
                      </div> 
                    )}
                    
                    <HiChevronDown className='text-gray-500 w-5 h-5 mt-2 m-1'/>
                  </button>

                  <div className={'absolute right-0 top-8 bg-app_dark border border-gray-700 z-10 rounded-md text-app_text overflow-hidden '+userDropdownVisibilityClass}> 
                      {user.username && (
                        <span className='w-50 py-2 px-3 text-sm'>
                          Hello, {user.username}!
                        </span>
                      )}

                      {!user.username && (
                        <button
                        className='flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black text-sm'
                        onClick={() => authModal.setShow('login')}>
                          <HiLogin className='w-5 h-5 mr-2'/>
                          Log In / Sign Up
                        </button>
                      )}
                      {user.username && (
                        <button
                        className='flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black text-sm'
                        onClick={() => user.logout()}>
                          <HiLogout className='w-5 h-5 mr-2'/>
                          Logout
                        </button>
                      )}
                          
                    </div>

                </ClickOutHandler>

                

            </div>

      </header>
  
  )
}

export default Header