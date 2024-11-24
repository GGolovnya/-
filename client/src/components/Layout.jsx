import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-primary/20 py-4 text-center">
        Обучающая страница © 2024
      </footer>    
    </div>
  );
};

export default Layout;