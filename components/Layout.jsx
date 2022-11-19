import React, { useEffect } from "react";
import { Navbar, Footer, Sidebar, ThemeSettings } from '../components';
import {useDisconnect, useAccount} from 'wagmi';

import { FiSettings } from 'react-icons/fi';
import Tooltip from '@mui/material/Tooltip'; 

import { useStateContext } from '../contexts/ContextProvider';

const Layout = ({ children }) => {
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

    useEffect(() => {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
        setCurrentColor(currentThemeColor);
        setCurrentMode(currentThemeMode);
        }
    }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className="flex w-screen relative bg-gradient-to-r from-[#C8E5D2] to-[#CDEAD8] dark:from-[#091B18] dark:to-[#091B20]">
            
            {activeMenu ? (
                <div className="w-64 fixed sidebar dark:bg-[#061513] bg-[#bfdcc9] ">
                    <Sidebar />
                </div>
                ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                    <Sidebar />
                </div>
            )}
            <div className={
                activeMenu
                    ? 'dark:bg-[#091B18]  bg-[#C8E5D2] min-h-screen md:ml-72 w-full  '
                    : 'bg-[#C8E5D2] dark:bg-[#091B18]  w-full min-h-screen flex-2 '
                }
            >
                <div className="fixed md:static bg-[#C8E5D2] dark:bg-[#091B18] navbar w-[100%] md:w-[85%] ">
                    <Navbar />
                </div>
                <div className="flex flex-col justify-between h-[90%] w-[100%] md:w-[85%] object-scale-down pt-12 pb-1 px-4 overflow-scroll">
                    <div className="flex flex-col items-start overflow-scroll object-contain ">
                        {themeSettings && (<ThemeSettings />)}
                        {children}                
                    </div>
                    <div className="justify-center">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Layout;