import React from 'react'
import { PropagateLoader } from 'react-spinners'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className='bg-[#091B18] h-screen flex flex-col items-center justify-center'>
      <div className='flex items-center space-x-2 mb-10'>
        {/* <img
          className=''
          src="https://i.imgur.com/4h7mAu7.png"
          alt=""
        /> */}
        <h1 className='text-lg text-white font-bold'>
          Loading the MARASTREAMS DRAW
        </h1>
      </div>
      <PropagateLoader color='white' size='30'/>
    </div>
  )
}

export default Loading