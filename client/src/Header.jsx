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
import PostFormModalContext from './PostFormModalContext';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { TopicContext } from './TopicContext';

const Header = () => {
  const navigate = useNavigate();

  const [userDropdownVisibilityClass, setUserDropdownVisibilityClass] = useState('hidden');
  const [plusDropdownVisibilityClass, setPlusDropdownVisibilityClass] = useState('hidden');
  const {setShow: setShowAddPost} = useContext(PostFormModalContext)
  const {setShow: setShowTopic} = useContext(TopicContext)

  const [searchText, setSearchText] = useState('');
  

  function toggleUserDropdown() {
    if (userDropdownVisibilityClass === 'hidden') {
       setUserDropdownVisibilityClass('block')
    } else {
       setUserDropdownVisibilityClass('hidden')
    }
  };

  const searchPosts = term => {
    fetch("/posts?search=" + term)
    .then(resp => resp.json())
    .then(data => console.log(data))
  }

  const handleSubmit = e => {
   e.preventDefault();
   
      searchPosts(searchText)
      setSearchText('')

    navigate(`/search/${searchText}`)
  }

  const authModal = useContext(AuthModalContext);
  const user = useContext(UserContext);
  
  return (
    
      <header className='w-full bg-app_dark p-2'>

            <div className='mx-4 flex relative'>
              <Link to='/'>
                <HiOutlineCode className='w-8 h-8 mr-4 text-white' />
              </Link>
                <form onSubmit={handleSubmit} className='bg-app_dark-brighter px-3 mx-4 flex rounded-md border border-app_border flex-grow'>

                    <HiSearch className='text-gray-300 h-6 w-6 mt-1'/>

                    <input
                        className='bg-app_dark-brighter text-sm text-white p-1 pl-2 pr-0 block focus:outline-none' 
                        type='text' 
                        placeholder='Search'
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
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
                    <ClickOutHandler onClickOut={() => setPlusDropdownVisibilityClass('hidden')}>
                      <button className='px-2 py-1' onClick={() => setPlusDropdownVisibilityClass('block')}>
                        <HiPlusSm className='text-gray-400 w-6 h-6 mx-2'/>
                      </button>
                      <div className='relative'> 
                        <div className={'absolute right-0 bg-app_dark border border-gray-700 z-10 rounded-md text-app_text overflow-hidden '+plusDropdownVisibilityClass} style={{width:'250px'}}>
                          
                            <button
                              className='flex w-full py-2 px-3 hover:bg-gray-300 hover:text-black text-sm'
                              onClick={() => {
                                setShowAddPost(true);
                                setPlusDropdownVisibilityClass('hidden');
                                }}>
                                <HiPlusSm className='w-5 h-5 mr-2'/>
                              Create Post
                            </button>
                            <button
                              className='flex w-full py-2 px-3 hover:bg-gray-300 hover:text-black text-sm'
                              onClick={() => {
                                setShowTopic(true);
                                setPlusDropdownVisibilityClass('hidden');
                              }}>
                                <HiPlusSm className='w-5 h-5 mr-2'/>
                              Create Topic
                            </button>
                         </div>
                      </div>
                    </ClickOutHandler>
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