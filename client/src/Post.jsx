import React from 'react'

const Post = () => {
  return (
    <div className='px-6 bg-app_dark text-app_text'> 
        <div className='border border-app_border bg-app_dark-brighter p-2 rounded-md'> 
          <h5 className='text-app_text-darker text-sm mb-1'>Posted by u/test123 5 hours ago</h5>
          <h2 className='text-xl mb-3'>HISTORY, PURPOSE AND USAGE</h2>
          <div className='text-sm leading-6'> 
              <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:

              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”
              </p>
              <p>
              The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.
              </p>
              <p>
              The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.
              </p>
          </div>
        </div>
      </div>
  )
}

export default Post