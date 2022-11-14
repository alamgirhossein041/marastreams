import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [universalProfile, setUniversalProfile] = useState('');
  const [evmNetworkDetails, setEvmNetworkDetails] = useState([{}]);
  const [upList, setUpList] = useState([{}]);
  const [userAddress, setUserAddress] = useState(null);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{ upList, setUpList, 
      universalProfile, setUniversalProfile,
      userAddress, setUserAddress,
      currentMode, setMode,
      evmNetworkDetails, setEvmNetworkDetails,
      screenSize, setScreenSize, 
      isClicked, setIsClicked, handleClick,
      initialState, 
      activeMenu,  setActiveMenu, 
      currentColor, setCurrentColor, setColor, 
      currentMode, setCurrentMode, setMode, 
      themeSettings, setThemeSettings 
     }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
