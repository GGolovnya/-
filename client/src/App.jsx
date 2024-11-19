import React from 'react';
import { RouterProvider, createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import ErrorPage from './components/pages/ErrorPage';
import MainPage from './components/pages/MainPage';
import Layout from './components/Layout';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import setupAxiosInterceptors from './components/utils/axiosConfig';

function AppContent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function App() {
  React.useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppContent />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/register',
          element: <RegisterPage />,
        },
      ],
    },
  ]);

  return (
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  );
}

export default App;