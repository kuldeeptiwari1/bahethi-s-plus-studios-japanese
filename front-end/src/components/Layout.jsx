import React from 'react';
import Navbar from './Navbar/Navbar.jsx';
import Footer from './Footer/Footer.jsx';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  const whiteNavbarPages = ['/about', '/contact'];
  const isWhiteNavbar = whiteNavbarPages.includes(location.pathname);
  return (
    <>
      <Navbar isWhite={isWhiteNavbar} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;