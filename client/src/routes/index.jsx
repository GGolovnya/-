
import WelcomePage from '../pages/WelcomePage';
import ContentPage from '../pages/ContentPage';
import ComponentsPage from '../pages/ComponentsPage';


const routes = [
  {
    path: '/',
    element: <WelcomePage />,
  },
  {
    path: '/content',
    element: <ContentPage />,
  },
  {
    path: '/components',
    element: <ComponentsPage />,
  },
];

export default routes;