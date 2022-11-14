import React, {useEffect, useState} from 'react';
// import { BsCurrencyDollar } from 'react-icons/bs';
// import { GoPrimitiveDot } from 'react-icons/go';
// import { IoIosMore } from 'react-icons/io';
// import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'; 

// import { Stacked, Pie, LineChart, SparkLine } from './components';
import {Button} from '../../components'
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const DropDown = ({ currentMode }) => (
    <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
      {/* <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" /> */}
    </div>
);

const UpDashboard = () => {
  const { currentColor, currentMode, universalProfile, userAddress } = useStateContext();
  const [activeTab, setActiveTab] = useState('totaAssets')

  

  // useEffect(() => {console.log('UP: ',universalProfile)},[userAddress] )

  return (
    <div className="mt-2">
        {/* <div className="flex flex-wrap lg:flex-nowrap justify-start ">
            <p className={`font-bold uppercase dark: font-white`}>Vault</p>
        </div> */}

        <div className="flex gap-10 flex-wrap justify-center">

            {/** Earnings Cards */}
            <div className='flex flex-row w-full flex-wrap'>
                {/** ...Top Row...*/}
                <div className='flex flex-wrap'>
                    {/** Card 1 */}
                    <div className=" rounded-2xl md:w-400 p-4 m-3 items-start hover:cursor-pointer" onClick={()=>{setActiveTab('totaAssets')}}   style={{ backgroundColor: currentColor }} >
                        <div className="flex justify-between items-center ">
                            <p className="font-semibold text-white text-2xl">Total Assets</p>

                        <div>
                            <p className="text-2xl text-white font-semibold mt-8">$63,448.78</p>
                            <p className="text-gray-200">Monthly revenue</p>
                        </div>
                        </div>

                        <div className="mt-4">
                            {/* <SparkLine currentColor={currentColor} id="column-sparkLine" height="100px" type="Column" data={SparklineAreaData} width="320" color="rgb(242, 252, 253)" /> */}
                        </div>
                    </div>

                    {/** Card 2 */}
                    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-start gap-10 hover:cursor-pointer" onClick={()=>{setActiveTab('tokenAssets')}} >
                        <div>
                            <p className="text-gray-400">Digital Assets</p>
                            <p className="text-2xl font-semibold ">$43,246</p>
                            
                            <p className="text-gray-400">{'Address: '+userAddress.slice(0,6)+'...'+userAddress.slice(-4)}</p>                            
                            <p className="text-gray-200">{'Universal Profile: '+universalProfile.slice(0,6)+'...'+universalProfile.slice(-4)}</p>
                        </div>

                        <div className="w-40 h-40">
                            {/* <Pie id="pie-chart" data={ecomPieChartData} legendVisiblity={false} height="160px" /> */}
                        </div>
                    </div>

                    {/** Card 3 */}
                    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-start gap-10 hover:cursor-pointer" onClick={()=>{setActiveTab('collectibles')}} >
                        <div>
                            <p className="text-gray-400">Collectibles</p>
                            <p className="text-2xl font-semibold ">$43,246</p>
                        </div>

                        <div className="w-40">
                            {/* <Pie id="pie-chart" data={ecomPieChartData} legendVisiblity={false} height="160px" /> */}
                        </div>
                    </div>

                </div>
            </div>

        </div>

        {/** Transactions Tab */}
        {activeTab === 'totaAssets' && (<div className="flex gap-10 m-4 flex-wrap justify-center">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-full">
            <div className="flex justify-between items-center gap-2">
                <p className="text-xl font-semibold">Recent Transactions</p>
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
            {/* <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
                <div className="flex justify-between items-center gap-2 mb-10">
                    <p className="text-xl font-semibold">Balance History Overview</p>
                    <DropDown currentMode={currentMode} />
                </div>
                <div className="md:w-full overflow-auto">
                    <LineChart />
                </div>
            </div> */}
        </div>)}

        {/** Tokens Tab */}
        {activeTab === 'tokenAssets' && (<div className="flex gap-10 m-4 flex-wrap justify-center">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-full">
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
            {/* <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
                <div className="flex justify-between items-center gap-2 mb-10">
                    <p className="text-xl font-semibold">Balance History Overview</p>
                    <DropDown currentMode={currentMode} />
                </div>
                <div className="md:w-full overflow-auto">
                    <LineChart />
                </div>
            </div> */}
        </div>)}

        {/** Transactions Tab */}
        {activeTab === 'collectibles' && (<div className="flex gap-10 m-4 flex-wrap justify-center">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-full">
            <div className="flex justify-between items-center gap-2">
                <p className="text-xl font-semibold">Collectibles</p>
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
            {/* <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
                <div className="flex justify-between items-center gap-2 mb-10">
                    <p className="text-xl font-semibold">Balance History Overview</p>
                    <DropDown currentMode={currentMode} />
                </div>
                <div className="md:w-full overflow-auto">
                    <LineChart />
                </div>
            </div> */}
        </div>)}

       
    </div>
  )
}

export default UpDashboard