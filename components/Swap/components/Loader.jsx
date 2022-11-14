import Image from 'next/image';
import React from 'react'
import { ethereumLogo } from "../assets";

const Loader = ({ title }) => {
  return (
    <div className='flex justify-center items-center flex-col w-full min-h-full object-contain'>
      <div className='relative w-56 h-56'>
        <Image
          src={ethereumLogo}
          alt="ethereum logo"
          className='loaderImg'
          layout='fill'
          objectFit='contain'
        />
      </div>
      <p className='loaderText'>{title}</p>
    </div>
  );
};

export default Loader