import React from 'react'

function Input (props) {
 
    return (

    <input {...props} 
      className={'bg-app_dark-brighter text-app_text p-2 border border-app_dark-brightest rounded-md block ' + props.className } 
    />
  )
}

export default Input;