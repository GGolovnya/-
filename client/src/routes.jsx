import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import UserProfilePage from './components/pages/UserProfilePage';

const routes = [
  { path: '/', element: <MainPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/profile', element: <UserProfilePage /> },
  // Добавьте другие маршруты здесь
];

export default routes;