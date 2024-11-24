import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation'

const Layout = () => {
  return (
    <div>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <footer> Обучающая страница © 2024</footer>
        
    </div>
  );
};

export default Layout;