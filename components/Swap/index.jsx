import React from 'react'

import { Exchange, Loader } from "./components";
import { useStateContext } from '../../contexts/ContextProvider';

const Swap = () => {
  const { currentColor, currentMode, userAddress } = useStateContext();  
  const account = userAddress;
  const poolsLoading = true;
  return (
    <div className='flex justify-center min-h-screen sm:px-16 px-6 bg-inherit object-fill'>  {/** container */}
      <div className='flex justify-between items-center flex-col max-w-[1280px] w-full'>     {/** innerContainer */}   

        <div className='flex-1 flex justify-start items-center flex-col w-full mt-10'> {/** exchangeContainer */}
          <h1 className='text-gray-100 font-poppins font-black text-4xl tracking-wide uppercase'>maraswap</h1> {/** headTitle */}
          <p className='text-gray-300 font-poppins font-medium mt-3 text-base'>Exchange tokens in seconds</p> {/** subTitle */}

          <div className='mt-10 w-full flex justify-center'> {/** exchangeBoxWrapper */}
            <div className='relative md:max-w-[700px] md:min-w-[500px] min-w-full max-w-full gradient-border p-[2px] rounded-3xl'> {/** exchangeBox */}
              <div className="pink_gradient" /> {/** pink_gradient */}
                <div className='w-full min-h-[400px] bg-black backdrop-blur-[4px] rounded-3xl shadow-xl flex p-10 text-gray-500'> {/** exchange */}
                    {account ? (
                    poolsLoading ? (
                        <Loader title="Loading pools, please wait!" />
                    ) : (
                        <Exchange />
                    )
                    ) : (
                    <Loader title="Please connect your wallet" />
                    )}
                </div>
              <div className="blue_gradient" /> {/** blue_gradient */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Swap