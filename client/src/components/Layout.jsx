import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './ui/Header';

function Layout() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;