import type { NextPage } from 'next'
import Head from 'next/head'
// import { useStateContext } from '../../contexts/ContextProvider';
import {useDisconnect, useAccount} from 'wagmi';


import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react'
import {Header, Login, Loading, CountDownTimer, AdminControls} from './components'
import {currency} from './constants'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import toast from 'react-hot-toast'
import Marquee from "react-fast-marquee";
// import { useContract, useContractRead, useProvider } from 'wagmi';

const lottery: NextPage = () => {
  const { address } = useAccount();
  // const provider = useProvider()
  
  
  const [userTickets, setUserTickets] = useState<number>(0);
  const [quantity, setQuantity] = useState <number>(1)
  const {contract, isLoading} = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
  // const contract = useContract({
  //   address: process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS,
  //   abi: ensRegistryABI,
  //   signerOrProvider: provider,
  // })

  // SmartContract Read Functions
  const {data: remainingTickets} = useContractRead(contract, "RemainingTickets");
  const {data: CurrentWinningReward} = useContractRead(contract, "CurrentWinningReward");
  const {data: ticketPrice} = useContractRead(contract, "ticketPrice");
  const {data: ticketCommission} = useContractRead(contract, "ticketCommission");
  const {data: expiration} = useContractRead(contract, "expiration");
  const {data: tickets} = useContractRead(contract, "getTickets");
  const {data: winnings} = useContractRead(contract, "getWinningsForAddress", address);
  const {data: lastWinner} = useContractRead(contract, "lastWinner");
  const {data: lastWinnerAmount} = useContractRead(contract, "lastWinnerAmount");
  const {data: isLotteryOperator} = useContractRead(contract, "lotteryOperator");


  // SmartContract Write Functions
  const {mutateAsync: BuyTickets} = useContractWrite(contract, "BuyTickets");
  const {mutateAsync: WithdrawWinnings} = useContractWrite(contract, "WithdrawWinnings");

  useEffect(() => {
    if(!tickets) return;

    const totalTickets: string[] = tickets;
    const noOfUserTickets = totalTickets.reduce((total, ticketAddress) => (ticketAddress === address ? total+1 : total), 0);

    setUserTickets(noOfUserTickets);
    console.log(userTickets)

  }, [tickets, address])


  // console.log(address);
  const handleClick = async () => {
    if(!ticketPrice) return;
    const notification = toast.loading("Buying your tickets...");

    try {
      const data = await BuyTickets([{
        value: ethers.utils.parseEther( 
          (Number(ethers.utils.formatEther(ticketPrice)) * quantity).toString() 
        ),
      }]);

      toast.success("Tickets purchased successfully!",{
        id: notification,
      })

      console.info("contract call success!", data);
      
    } catch (err) {
      toast.error("Whoops something went wrong",{
        id: notification,
      });

      console.error("contract call failure", err);
    }
  }

  const onWithdrawWinnings = async () => {
    const notification = toast.loading("Withdrawing winnings...");

    try {
      const data = await WithdrawWinnings([{ }]);

      toast.success("Winnings withdrawn successfully!",{
        id: notification,
      });
    } catch (err) {
      toast.error("Whoops something went wrong!", {
        id: notification,
      });

      console.error("contract call failure", err);
    }
  }
  
  

  if(isLoading) return( <Loading /> );

  if(!address) return (<Login />);

  return (
    <div className="bg-[#091B18] h-[100%] flex flex-col object-contain overflow-scroll">
      <Head>
        <title>lottery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex-1 object-contain'>
        <Header />

        <Marquee className='bg-[#091B18] p-5 mb-5' gradient={false} speed={100}>
          <div className='flex space-x-5 mx-10'>
            <h4 className='text-white font-bold'>Last winner: {lastWinner?.toString()} </h4>
            <h4 className='text-white font-bold'>Previous winnings:{lastWinnerAmount &&
              ethers.utils.formatEther(lastWinnerAmount?.toString())}{" "}{currency}
            </h4>
          </div>
        </Marquee>

        {isLotteryOperator === address && (
          <div className='flex justify-center'>
            <AdminControls />
          </div>
        )}

        {winnings > 0 && (
          <div className='max-w-md md:max-w-2xl lg:max-w-4xl mx-auto'>
            <button className='p-5 bg-gradient-to-br from-orange-500 to-emerald-600 animate-pulse text-center rounded-xl w-full'
            onClick={onWithdrawWinnings}
            >
              <p className='font-semibold'>Winner Winner chicken Dinner!</p>
              <p>
                Total Winnings: {ethers.utils.formatEther(winnings.toString())}{" "} {currency}
              </p>
              <br />
              <p className='font-semibold'>Click here to withdraw</p>
            </button>
          </div>
        )}

        {/** The Next Draw box */}
        <div className='space-y-5 md:space-y-0 m-5 md:flex  md:flex-row items-start justify-center md:space-x-5'>
          <div className='stats-container'>
            <h1 className='text-white text-5xl font-semibold text-center'>
              The Next Draw
            </h1>
            <div className='flex justify-between p-2 space-x-2'>
              <div className='stats'>
                <h2 className='text-sm text-white/80'>Total pool</h2>
                <p className='text-xl text-white'>
                  {CurrentWinningReward && ethers.utils.formatEther(CurrentWinningReward.toString())} {currency}
                </p>
              </div>
              <div className='stats'>
                <h2 className='text-sm'>Tickets Remaining</h2>
                <p className='text-xl'>{remainingTickets?.toNumber()}</p>
              </div>
          </div>
          {/**Countdown timer */}
          <div className='text-white mt-5 mb-3'>
            <CountDownTimer />
          </div>
          </div>
          <div className='stats-container space-y-2'>
            <div className='stats-container'>
              <div className='flex justify-between items-center text-white'>
                <h2 className=''>Price per ticket </h2>
                <p className=''>{ticketPrice && ethers.utils.formatEther(ticketPrice.toString())} {currency}</p>
              </div>

              <div className='flex text-white items-center space-x-2 bg-[#091B18] border-[#004337] border p-4'>
                <p> TICKETS</p>
                <input 
                  className='flex w-full bg-transparent text-right outline-none'
                  type='number' 
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(e) => { setQuantity(Number(e.target.value))}}
                />
              </div>

              <div className='space-y-2 mt-5'>
                <div className='flex items-center justify-between text-emerald-300 text-sm italic font-extrabold'>
                  <p>Total cost of tickets</p>
                  <p>
                    {ticketPrice && 
                      Number(ethers.utils.formatEther(ticketPrice.toString())) * quantity } {" "} {currency}
                  </p>
                </div>

                <div className='flex items-center justify-between text-emerald-300 text-xs italic'>
                  <p className='text-xl'>Service Fee</p>
                  <p>{ticketCommission && ethers.utils.formatEther(ticketCommission.toString())} {currency}</p>
                </div>

                <div className='flex items-center justify-between text-emerald-300 text-xs italic'>
                  <p className='text-xl'>+ Network Fees</p>
                  <p>TBC</p>
                </div>
              </div>

              <button 
                disabled = {expiration?.toString() < Date.now().toString() || remainingTickets?.toNumber() === 0}
                onClick={handleClick}
                className='mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600 px-10 py-5 
                rounded-md font-semibold text-white shadow-xl disabled:from-gray-600 disabled:text-gray-100 disabled:to-gray-600 disabled:cursor-not-allowed'>
                Buy {quantity} Tickets for {ticketPrice &&
                Number(ethers.utils.formatEther(ticketPrice.toString())) * quantity } {currency}
              </button>
            </div>

            {userTickets > 0 && (
                <div className='stats'>
                  <p className='text-lg mb-2'>You have {userTickets} Tickets in this draw</p>

                  <div className='flex max-w-sm flex-wrap gap-x-2 gap-y-2'>
                    {Array(userTickets)
                      .fill("").map((_, index) => (
                      <p key={index} className='text-emerald-300 h-20 w-12 bg-emerald-500/30 rounded-lg flex flex-shrink-0 items-center justify-center text-xs italic'
                      >{index+1}</p>
                    ))}
                  </div>
                </div>
              )

            }

          </div>
        
        </div>


        {/**The price per ticket box */}
        <div>
          <div>
            
          </div>
        </div>
      </div>

      <footer className='border-t border-emerald-500/20 flex items-center text-white justify-between p-5'>
        <img 
          className='h-10 w-10 filter hue-rotate-90 opacity-20 rounded-full'
          src="https://i.imgur.com/4h7mAu7.png"
          alt=""
        />

        <p className='text-xs text-emerald-900 pl-5'>
          DISCLAIMER: We are not liable for any losses that are incured or problems that arise at online casinos or elsewhere.
          Gambling is totally at your own risk ...........................................................................
        </p>
      </footer>

      

      
    </div>
  )
}

export default lottery

