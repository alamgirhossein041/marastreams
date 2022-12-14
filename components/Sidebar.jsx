import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import {useDisconnect, useAccount} from 'wagmi';
import {useIsMounted} from '../hooks/useIsMounted'

import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';

import { useStateContext } from '../contexts/ContextProvider';
import { ConnectButton } from "@rainbow-me/rainbowkit";

import {HomeIcon, MagnifyingGlassIcon, BuildingLibraryIcon, PlusCircleIcon, HeartIcon } from '@heroicons/react/24/outline'

const menuItems = [
  { id: 1, label: "Vault", icon: HomeIcon, link: "/" },
  { id: 2, label: "Swap", icon: MagnifyingGlassIcon, link: "/swap" },
  { id: 3, label: "Lottery", icon: BuildingLibraryIcon, link: "/lottery" },
  { id: 4, label: "Rails", icon: PlusCircleIcon, link: "/rails" },
  { id: 5, label: "Invest", icon: PlusCircleIcon, link: "/invest" },
  { id: 6, label: "Borrow", icon: PlusCircleIcon, link: "/borrow" },
];

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();
  const { address: userAddress, status } = useAccount();
  const { disconnect } = useDisconnect()
  const mounted = useIsMounted();  
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);


  const router = useRouter();

  const activeSidebarMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };


  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeSidebarMenu.id === menu.id,
      }
    );
  };


  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className={`ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 flex justify-between flex-col`} > 
     {activeMenu && (
        <>
          <div className="flex flex-col">
            <div className="flex items-center justify-between relative">
            
              <div onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"><SiShopware /> 
                
                <Link href="/" >
                  <span>Marastreams</span>
                </Link>
                <Tooltip title="Menu" placement="bottom">
                  <button
                      type="button"
                      onClick={() => setActiveMenu(!activeMenu)}
                      style={{ color: currentColor }}
                      className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                    >
                      <MdOutlineCancel />
                  </button>
                </Tooltip>
                
              </div>
            </div>

            <div className="ml-2 mr-4 mb-8 mt-8 bg-[#CDEAD8] dark:bg-[#091B18] rounded-2xl bg-opacity-60">
              <div className="flex flex-col items-start mt-2">
                {menuItems.map(({ icon: Icon, ...menu }) => {
                  {/** const classes = getNavItemClasses(menu); */}
                  return (
                    <div className={`text-emerald-900 dark:text-emerald-100 m-3 mt-4 uppercase`}> {/** <div className={classes}> */}
                      <Link href={menu.link}>
                        <div className="rounded-xl flex hover:cursor-pointer hover:bg-[#b2d2be] hover:dark:bg-[#0c2923]">
                          <a className="flex py-2 px-3 items-center w-full h-full">
                            <div style={{ width: "2.5rem" }}>
                              <Icon />
                            </div>
                            {(
                              <span
                                className={({ isActive }) => ({
                                  backgroundColor: isActive ? currentColor : '',
                                })}
                              >
                                {menu.label}
                              </span>
                            )}
                          </a>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={`${getNavItemClasses({})} px-3 py-4`}>        
            {!toggleCollapse && (
              <>
                {mounted? userAddress && (
                  <div className="text-emerald-400 justify-center">                
                    <button 
                      className="bg-[#CDEAD8] dark:bg-[#091B18] dark:hover:text-[#b7eccb] hover:text-[#0c2923] text-gray-500 dark:text-white font-bold py-1 px-4 rounded"
                      onClick={disconnect}
                    >
                      {userAddress.slice(0,6)+"..."+userAddress.slice(-4)}
                    </button>

                    <div className=" w-40 text-emerald-200 object-contain">
                      <ConnectButton />
                    </div>
                  </div>
                ): (
                  <div className=" w-40 text-emerald-200 object-contain">
                      <ConnectButton />
                    </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;