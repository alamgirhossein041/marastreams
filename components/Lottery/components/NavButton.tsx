import React from 'react'
interface Props {
    title: string | any;
    isActive: boolean | any;
    onclick?: () => void | any;
}

const NavButton = ({title, isActive, onclick}: Props) => {
  return (
    <button 
        className={`${isActive && "bg-[#036756]"} hover:bg-[#036756] text-white py-2 px-2 rounded font-bold`}
        onClick={onclick}
        >
        {title}
    </button>
  )
}

export default NavButton