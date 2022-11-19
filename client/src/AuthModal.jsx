import Input  from './Input';
import React, { useState,
                useContext } from 'react';
import AuthModalContext from './AuthModalContext'
import Button from './Button';
import ClickOutHandler from 'react-clickout-handler';
import UserContext from './UserContext';


const AuthModal = () => {

  const [modalType, setModalType] = useState('login');

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const modalContext = useContext(AuthModalContext);
  const user = useContext(UserContext);

  const visibleClass = modalContext.show ? 'block' : 'hidden';
  if (modalContext.show && modalContext.show !== modalType) {
    setModalType(modalContext.show);
  }


  const register = async e => {
    e.preventDefault();
    
    const resp = await fetch('/signup', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, username, password})
    })

      const data = await resp.json();
      localStorage.setItem('jwt', data.jwt);
      console.log(data)
      user.setCurrentUser(data.user)
      modalContext.setShow(false);
      setEmail('');
      setUsername('');
      setPassword('');
  };
  
  const login = async e => {
    const resp = await fetch('/login', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password})
    })

    const data = await resp.json();
      localStorage.setItem('jwt', data.jwt);
      user.setCurrentUser(data.user)
      modalContext.setShow(false);
      setUsername('');
      setPassword('');

  }

  return (
    <div 
        className={'w-screen h-screen fixed top-0 left-0 z-30 flex ' + visibleClass}
        style={{backgroundColor: 'rgba(0, 0, 0, .6)'}}
    >
      <ClickOutHandler onClickOut={() => modalContext.setShow(false)}>

        <div className='border border-app_dark-brightest w-3/4 sm:w-1/2 md:w-1/3 bg-app_dark p-5 text-app_text self-center mx-auto rounded-md'
        > 
          {modalType === 'login' && (
             <h1 className='text-2xl mb-5'>Login</h1>
          )}
          {modalType === 'register' && (
             <h1 className='text-2xl mb-5'>Register</h1>
          )}
          {modalType === 'register' && (
             <label>
                <span className='text-app_text-darker text-sm'>E-mail:</span>
                <Input 
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)} 
                  className='mb-3 w-full'
                  />
              </label>
          )}
            
            <label>
              <span className='text-app_text-darker text-sm'>Username:</span>
              <Input 
                type='text' 
                value={username}
                onChange={e => setUsername(e.target.value)} 
                className='mb-3 w-full'
                />
            </label>
            <label> 
              <span className='text-app_text-darker text-sm'>password:</span>
              <Input 
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)} 
                className='mb-3 w-full'
                />
            </label>
            {modalType === 'login' && (
              <Button 
                 onClick={() => login()}
                 className='w-full py-2 mb-3' 
                 style={{borderRadius:'.3rem'}}>
                Log In
              </Button>
            )}
            {modalType === 'register' && (
               <Button 
                  onClick={(e)=> register(e)}
                  className='w-full py-2 mb-3' 
                  style={{borderRadius:'.3rem'}}>
                  Sign Up
                </Button>
            )}
            

            {modalType === 'login' && (
              <div> 
                New to TeKTalk? <button 
                  onClick={() => modalContext.setShow('register')}
                  className='text-blue-600'
                >
                  Sign Up
                </button>
              </div>
            )}
            {modalType === 'register' && (
              <div> 
                Already have an account? <button 
                  onClick={() => modalContext.setShow('login')}
                  className='text-blue-600'
                >
                Log In
                </button>
              </div>
            )}
            
        </div>
        </ClickOutHandler>
    </div>
  )
}

export default AuthModal