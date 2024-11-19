import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import Layout from './components/Layout';
import routes from './routes';
import setupAxiosInterceptors from './components/utils/axiosConfig';

function App() {
  React.useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: routes,
    },
  ]);

  return (
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  );
}

export default App;