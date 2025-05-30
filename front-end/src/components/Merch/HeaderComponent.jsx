import React from 'react';
import Navbar from '../Navbar/Navbar';


export default function HeaderComponent() {


  return (
    <div className='flex flex-col md:flex-row justify-center items-center'>
      <h1 className='leading-[50px] md:order-1 order-2 m-3 md:m-3'>
        <span className="font-edos p-0">KISHORE</span><br />
        <span className="font-edo p-0" style={{ color: '#8c52ff' }}>
          MERCH
        </span>
      </h1>

      <div className='md:order-2 order-1'>
        <Navbar />
      </div>
    </div>
  );
}
