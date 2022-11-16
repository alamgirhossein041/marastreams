import React, {useEffect, useState} from 'react';
// import { BsCurrencyDollar } from 'react-icons/bs';
// import { GoPrimitiveDot } from 'react-icons/go';
// import { IoIosMore } from 'react-icons/io';

// import { Stacked, Pie, LineChart, SparkLine } from './components';
import {Button} from '../../components'
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const DropDown = ({ currentMode }) => (
    <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    </div>
);

const UpDashboard = () => {
  const { currentColor, currentMode, universalProfile, userAddress } = useStateContext();
  const [activeTab, setActiveTab] = useState('totaAssets')

  

  // useEffect(() => {console.log('UP: ',universalProfile)},[userAddress] )

  return (
    <div className="h-screen md:h-[100%]">
        {/* <div className="flex flex-wrap lg:flex-nowrap justify-start ">
            <p className={`font-bold uppercase dark: font-white`}>Vault</p>
        </div> */}

        <div className=" md:hidden flex gap-1 flex-wrap justify-center object-scale-down">
            <div className='flex flex-row w-full flex-wrap'>
                {/** ...Top Row...*/}
                <div className='flex flex-wrap'>
                    <div class="justify-between grid grid-cols-3 gap-6 m-4 mb-1">
                        {/** Card 1 */}
                        <article className="container bg-gradient-to-br from-orange-500 to-emerald-600 dark:from-emerald-600 dark:to-gray-900 animate-pulse text-center rounded-xl w-full bg-[#E5EDE9] dark:text-gray-200 dark:bg-secondary-dark-bg shadow-2xl px-2 py-5 hover:cursor-pointer" onClick={()=>{setActiveTab('totaAssets')}} >
                            <h1 className="font-bold text-sm text-emerald-100 dark:text-emerald-100">Total Assets</h1>
                        </article>
                        {/** Card 2 */}
                        <article className="ccontainer bg-gradient-to-br from-orange-300 to-emerald-400 dark:from-emerald-900 dark:to-gray-900 text-center rounded-xl w-full bg-[#E5EDE9] dark:text-gray-200 dark:bg-secondary-dark-bg shadow-2xl px-2 py-5 hover:cursor-pointer" onClick={()=>{setActiveTab('tokenAssets')}}>
                            <h1 className="font-bold text-sm text-emerald-100 dark:text-emerald-100">Digital Assets</h1>
                        </article>
                        {/** Card 3 */}
                        <article className="container bg-gradient-to-br from-orange-300 to-emerald-400 dark:from-emerald-900 dark:to-gray-900 text-center rounded-xl w-full bg-[#E5EDE9] dark:text-gray-200 dark:bg-secondary-dark-bg shadow-2xl px-2 py-5 hover:cursor-pointer" onClick={()=>{setActiveTab('collectibles')}}>
                            <h1 className="font-bold text-sm text-emerald-100 dark:text-emerald-100">Collectibles</h1>                    
                        </article>
                    </div>
                </div>
            </div>
        </div>

        <div className="hidden md:block gap-1 flex-wrap justify-center object-scale-down">
            <div className='flex flex-row w-full flex-wrap'>
                {/** ...Top Row...*/}
                <div className='flex flex-wrap'>
                    <div class="justify-between grid grid-cols-3 gap-6 m-4 mb-1">
                        {/** Card 1 */}
                        <article className="container bg-gradient-to-br from-orange-500 to-emerald-600 dark:from-emerald-600 dark:to-gray-900 animate-pulse text-center rounded-xl w-full bg-[#E5EDE9] dark:text-gray-200 dark:bg-secondary-dark-bg shadow-2xl px-2 py-5 hover:cursor-pointer" onClick={()=>{setActiveTab('totaAssets')}} >
                            <h1 className="font-bold text-sm text-emerald-100 dark:text-emerald-100">Total Assets</h1>
                            <h6 className="text-sm text-gray-400 mb-5">{'Address: '+userAddress.slice(0,6)+'...'+userAddress.slice(-4)}</h6>
                            <h6 className="text-sm text-gray-400 mb-5">{'Universal Profile: '+universalProfile.slice(0,6)+'...'+universalProfile.slice(-4)}</h6>
                        </article>
                        {/** Card 2 */}
                        <article className="ccontainer bg-gradient-to-br from-orange-300 to-emerald-400 dark:from-emerald-900 dark:to-gray-900 text-center rounded-xl w-full bg-[#E5EDE9] dark:text-gray-200 dark:bg-secondary-dark-bg shadow-2xl px-2 py-5 hover:cursor-pointer" onClick={()=>{setActiveTab('tokenAssets')}}>
                            <h1 className="font-bold text-sm text-emerald-100 dark:text-emerald-100">Digital Assets</h1>
                            <h6 className="text-sm text-gray-400 mb-5"></h6>
                            <p className="font-light text-gray-500 hover:font-semibold">$43,246</p>
                        </article>
                        {/** Card 3 */}
                        <article className="container bg-gradient-to-br from-orange-300 to-emerald-400 dark:from-emerald-900 dark:to-gray-900 text-center rounded-xl w-full bg-[#E5EDE9] dark:text-gray-200 dark:bg-secondary-dark-bg shadow-2xl px-2 py-5 hover:cursor-pointer" onClick={()=>{setActiveTab('collectibles')}}>
                            <h1 className="font-bold text-sm text-emerald-100 dark:text-emerald-100">Collectables</h1>
                            <h6 className="text-sm text-gray-400 mb-5"></h6>
                            <p className="font-light text-gray-500 hover:font-semibold">$43,246</p>                  
                        </article>
                    </div>
                </div>
            </div>
        </div>

        {/** Transactions Tab */}
        {activeTab === 'totaAssets' && (<div className="flex gap-10 m-4 flex-wrap justify-center shadow-2xl overflow-clip">
            {/** Total Assets Card */}
            <article className="container bg-[#E5EDE9] dark:text-gray-200 dark:bg-secondary-dark-bg shadow-2xl rounded-2xl p-5 hover:cursor-pointer" onClick={()=>{setActiveTab('totaAssets')}} >
                <h1 className="font-extrabold text-2xl text-emerald-600 dark:text-emerald-100">Total Assets</h1>
                <p className="font-light text-gray-500 hover:font-semibold">$63,448.78</p>
                <h6 className="text-sm text-gray-400 mb-5">{'Address: '+userAddress.slice(0,6)+'...'+userAddress.slice(-4)}</h6>
                <h6 className="text-sm text-gray-400 mb-5">{'Universal Profile: '+universalProfile.slice(0,6)+'...'+universalProfile.slice(-4)}</h6>
                <a href="#" className="rounded-lg py-2 px-4 text-center text-white bg-gray-600 hover:bg-gray-700">$63,448.78</a>
            </article>
            {/** Transactions Card */}
            <div className="bg-[#E5EDE9] dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-full">
            <div className="flex justify-between items-center gap-2">
                <p className="text-xl font-semibold">Recent Transactions</p>
            </div>
            <div className="mt-10 w-72 md:w-400">
                {recentTransactions.map((item) => (
                <div key={item.title} className="flex justify-between mt-4">
                    <div className="flex gap-4">
                    <button
                        type="button"
                        style={{
                        color: item.iconColor,
                        backgroundColor: item.iconBg,
                        }}
                        className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                    >
                        {item.icon}
                    </button>
                    <div>
                        <p className="text-md font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                    </div>
                    <p className={`text-${item.pcColor}`}>{item.amount}</p>
                </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-5 border-t-1 border-color">
                <div className="mt-3">
                <Button
                    color="white"
                    bgColor={currentColor}
                    text="Add"
                    borderRadius="10px"
                />
                </div>

                <p className="text-gray-400 text-sm">36 Recent Transactions</p>
            </div>
            </div>
        </div>)}

        {/** Tokens Tab */}
        {activeTab === 'tokenAssets' && (<div className="flex gap-10 m-4 flex-wrap justify-center shadow-2xl">
            <div className="bg-[#E5EDE9] dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-full">
            <div className="flex justify-between items-center gap-2">
                <p className="text-xl font-semibold">Token Assets</p>
                <DropDown currentMode={currentMode} />
            </div>
            <div className="mt-10 w-72 md:w-400">
                {recentTransactions.map((item, index) => (
                <div key={item.title} className="flex justify-between mt-4">
                    <div className="flex gap-4">
                     <p>{index+1}</p>
                    <div>
                        <p className="text-md font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                    </div>
                    <p className={`text-${item.pcColor}`}>{item.amount}</p>
                </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-5 border-t-1 border-color">
                <div className="mt-3">
                <Button
                    color="white"
                    bgColor={currentColor}
                    text="Add"
                    borderRadius="10px"
                />
                </div>

                <p className="text-gray-400 text-sm">36 Recent Transactions</p>
            </div>
            </div>
        </div>)}

        {/** Transactions Tab */}
        {activeTab === 'collectibles' && (<div className="flex gap-10 m-4 flex-wrap justify-center shadow-2xl">
            <div className="bg-[#E5EDE9] dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-full">
            <div className="flex justify-between items-center gap-2">
                <p className="text-xl font-semibold">Collectables</p>
                <DropDown currentMode={currentMode} />
            </div>
            <div className="mt-10 w-72 md:w-400">
                {recentTransactions.map((item) => (
                <div key={item.title} className="flex justify-between mt-4">
                    <div className="flex gap-4">
                    <button
                        type="button"
                        style={{
                        color: item.iconColor,
                        backgroundColor: item.iconBg,
                        }}
                        className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                    >
                        {item.icon}
                    </button>
                    <div>
                        <p className="text-md font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                    </div>
                    <p className={`text-${item.pcColor}`}>{item.amount}</p>
                </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-5 border-t-1 border-color">
                <div className="mt-3">
                <Button
                    color="white"
                    bgColor={currentColor}
                    text="Add"
                    borderRadius="10px"
                />
                </div>

                <p className="text-gray-400 text-sm">36 Recent Transactions</p>
            </div>
            </div>
        </div>)}

       
    </div>
  )
}

export default UpDashboard