import { lazy, Suspense } from 'react';

const WelcomePage = lazy(() => import('../pages/WelcomePage'));
const ContentPage = lazy(() => import('../pages/ContentPage'));
const ComponentsPage = lazy(() => import('../pages/ComponentsPage'));

const routes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <WelcomePage />
      </Suspense>
    ),
  },
  {
    path: '/content',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ContentPage />
      </Suspense>
    ),
  },
  {
    path: '/components',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ComponentsPage />
      </Suspense>
    ),
  },
];

export default routes;