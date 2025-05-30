import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import Footer from '../Footer/Footer';
import './merch.css';
import slideShowImages from './slideShowImages';
import Navbar from '../Navbar/Navbar';

function Merch() {
  const [imageIndexes, setImageIndexes] = useState([0, 1, 2, 3]);
  const categories = [
    { title: 'Ecchi Prints', link: '/ecchi-prints' },
    { title: 'T-Shirts', link: '/t-shirts' },
    { title: 'Light Novels', link: '/light-novels' },
    { title: 'Manga', link: '/manga' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes((prevIndexes) =>
        prevIndexes.map((index) => (index + 1) % slideShowImages.length)
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <Navbar/>
      {/* <HeaderComponent /> */}
      <div className='h-[700px] md:h-auto w-full flex justify-center items-center'>
      <div className='grid grid-cols-2 px-6 md:px-56 w-full gap-6 justify-center items-center mt-2 mb-12'>
        {categories.map((category, index) => (
          <Link key={index} to={category.link} className='flex flex-col justify-center items-center p-4 px-0 border-4 border-black rounded-lg shadow-md bg-white cursor-pointer'>
            <h2 className='text-lg font-bold mb-2'>{category.title}</h2>
            <div className='relative md:w-[300px] md:h-[300px] w-[150px] h-[140px] overflow-hidden rounded-md border-2 border-black'>
              <img
                className='absolute inset-0 md:w-[300px] md:h-[300px] w-[150px] h-[140px] object-cover transition-opacity duration-700 ease-in-out opacity-100'
                src={slideShowImages[imageIndexes[index % 4]]}
                alt={category.title}
              />
            </div>
          </Link>
        ))}
      </div>
      </div>
      <Footer />
    </>
  );
}

export default Merch;
