import React from 'react'

const TextArea = (props) => {
  return (
    <textarea {...props} 
      className={'bg-app_dark-brighter text-app_text p-2 border border-app_dark-brightest rounded-md block ' + props.className } 
    />
  )
}

export default TextArea