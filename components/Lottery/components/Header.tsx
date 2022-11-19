import React from 'react'
import NavButton from './NavButton'
import {Bars3BottomRightIcon} from '@heroicons/react/24/solid'
// import { useAddress } from '@thirdweb-dev/react';
import {useDisconnect, useAccount} from 'wagmi';
import { useStateContext } from '../../../contexts/ContextProvider';


const Header = () => {
  const {disconnect} = useDisconnect();
  const { currentColor, activeMenu, setActiveMenu, screenSize, userAddress } = useStateContext();
  const { address, status } = useAccount();
  // const address = userAddress;

  return (
    <header className='grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5'>
        <div className='flex items-center space-x-2'>
            <img 
                className='rounded-full h-20 w-20' 
                src='https://i.imgur.com/4h7mAu7.png' 
                alt='' 
            />
        
            <div>
                <h1 className='text-lg text-white font-bold'>Marastreams Draw</h1>
                <p className='text-xs text-emerald-500 truncate'>
                    User: {address?.substring(0,5)}... {address?.substring(address.length, address.length-5)}
                </p>
            </div>
        </div>

        

        <div className='hidden md:flex md:col-span-3 items-center justify-center rounded-md'>
            <div className='bg-[#0A1F1C]  space-x-1'>
                {/**Button */}
                <NavButton title='Buy Tickets' isActive />
                {/**Button */}
                <NavButton onclick={disconnect} title='Logout' isActive />
            </div>
        </div>

        

        <div className='flex flex-col ml-auto text-right'>
            <Bars3BottomRightIcon className='h-8 w-8 mx-auto text-white cursor-pointer' />
            <span className='md:hidden'>
                <NavButton onclick={disconnect} title='Logout' isActive />
            </span>
        </div>
    </header>
  )
}

export default Header