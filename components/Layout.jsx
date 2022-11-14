import React, { useEffect } from "react";
import { Navbar, Footer, Sidebar, ThemeSettings } from '../components';

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
        <div className="flex w-screen relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                <Tooltip title="Settings" placement="top">
                    <button
                        type="button"
                        onClick={() => setThemeSettings(true)}
                        style={{ background: currentColor, borderRadius: '50%' }}
                        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                        <FiSettings />
                    </button>
                </Tooltip>
            </div>
            {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                    <Sidebar />
                </div>
                ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                    <Sidebar />
                </div>
            )}
            <div className={
                activeMenu
                    ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                    : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                }
            >
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-[85%] ">
                    <Navbar />
                </div>
                <div className="flex flex-col justify-between h-screen object-scale-down p-4">
                    <div className="flex flex-col items-start overflow-scroll object-contain h-screen w-screen ">
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