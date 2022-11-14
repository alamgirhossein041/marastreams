import React from 'react'
import {useMetamask} from '@thirdweb-dev/react'



const Login = () => {
  const connectWithMetamask = useMetamask();
  return (
    <div className='bg-[#091B18] min-h-screen flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center mb-10 justify-center text-center'>
            <img
                className='rounded-full h-56 w-56 mb-10'
                src="https://i.imgur.com/4h7mAu7.png" 
                alt="Login Image" 
            />
            <h1 className='text-6xl text-white font-bold'>Marastreams Draw</h1>
            <h2 className='text-sm text-white/40'>Loggin with your metamask to get started</h2>

            <button onClick={connectWithMetamask} className='bg-white px-8 py-5 mt-10 rounded-lg sha font-bold'>Login with metamask</button>
        </div>
    </div>
  )
}

export default Login