// import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector'
// import { signIn } from 'next-auth/react'
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi'
// import { useRouter } from 'next/router'
// import axios from 'axios'
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { MagicAuthConnector } from '@everipedia/wagmi-magic-connector'
import { useStateContext } from '../contexts/ContextProvider';
import { useEffect } from 'react'

const Login = () =>{
  const { address } = useAccount()
  const { setUserAddress } = useStateContext(); 
  // const { address, isConnected } = useAccount()

  {/** Handle Magic Auth */}
  // const { connectAsync } = useConnect({
  //   connector: new Web3AuthConnector({
  //     options: {
  //       enableLogging: true,
  //       clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID, // Get your own client id from https://dashboard.web3auth.io
  //       network: 'testnet', // web3auth network
  //       chainId: '0x61', // chainId that you want to connect with
  //     },
  //   }),
  // })
  // const { disconnectAsync } = useDisconnect()
  // const { isConnected } = useAccount()
  // const { signMessageAsync } = useSignMessage()
  // const { push } = useRouter()

  // const handleAuth = async () => {

  //   if (isConnected) {
  //     await disconnectAsync()
  //   }

  //   const { account } = await connectAsync()

  //   const userData = { address: account, chain: '0x1', network: 'evm' }

  //   const { data } = await axios.post('/api/auth/request-message', userData, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })

  //   const message = data.message

  //   const signature = await signMessageAsync({ message })

  //   // setUserAddress(address)
    

  //   // redirect user after success authentication to '/user' page
  //   const { url } = await signIn('credentials', {
  //     message,
  //     signature,
  //     redirect: false,
  //     callbackUrl: '/user',
  //   })
  //   /**
  //    * instead of using signIn(..., redirect: "/user")
  //    * we get the url from callback and push it to the router to avoid page refreshing
  //    */
  //   push(url)
  // }
{/** End of Handle Magic Auth */}

{/** Handle Magic Auth */}
  // const { connectAsync: connectMagicAsync } = useConnect({
  //   connector: new MagicAuthConnector({
  //     options: {
  //       apiKey: process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY, //required
  //     },
  //   }),
  // })
  // const { disconnectAsync: disconnecMagictAsync } = useDisconnect()
  // const { isConnected: isMagicConnected } = useAccount()
  // const { signMessageAsync: magicSignMessageAsync } = useSignMessage()
  // const { push: magicPush } = useRouter()

  // const magicHandleAuth = async () => {
  //   if (isMagicConnected) {
  //     await disconnecMagictAsync()
  //   }

  //   const { account } = await connectMagicAsync()
  //   const userData = { address: account, chain: '0x61', network: 'evm' }

  //   const { data } = await axios.post('/api/auth/request-message', userData, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })

  //   const message = data.message
  //   const signature = await magicSignMessageAsync({ message });    

  //   // redirect user after success authentication to '/user' page
  //   const { url } = await signIn('credentials', {
  //     message,
  //     signature,
  //     redirect: false,
  //     callbackUrl: '/user',
  //   })
  //   /**
  //    * instead of using signIn(..., redirect: "/user")
  //    * we get the url from callback and push it to the router to avoid page refreshing
  //    */
  //    magicPush(url)
  // }
{/** End of Magic Auth */}
 
  useEffect(()=>{    
    setUserAddress(address);
    console.log('User Address: ' + address);
  },[address])


  return (
    <div className='object-contain justify-center align-middle min-w-max min-h-max'>
      

      <div className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        <h3>Web3auth Authentication</h3>
        {/* <button onClick={() => handleAuth()}>Authenticate via Web3Auth</button> */}
      </div>

      
      <div className="flex items-center justify-center space-x-2 my-5">
						<div className="h-px w-16 bg-gray-100"></div>
						<div className="text-gray-300 font-normal">or</div>
						<div className="h-px w-16 bg-gray-100"></div>
			</div>


      <div className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        <h3>Rainbow Authentication</h3>
        <ConnectButton />
      </div>

      <div className="flex items-center justify-center space-x-2 my-5">
						<div className="h-px w-16 bg-gray-100"></div>
						<div className="text-gray-300 font-normal">or</div>
						<div className="h-px w-16 bg-gray-100"></div>
			</div>

      

      <div className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        <h3>Magic Link Authentication</h3>
        {/* <button onClick={() => magicHandleAuth()}>Authenticate via Magic.Link</button> */}
      </div>
    </div> 
  )
}

export default Login