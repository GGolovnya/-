import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes'; //изучаем все маршруты по которым нужно отрисовать страницу
import Layout from './components/Layout'; //отрисовщик страницы в который мы определяем какую страницу отрисовать

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />, //выбираем компонент с лояутом
      children: routes, //выбираем массив со всеми нашими путями (дочерняя отрисовка)
    },
  ],
  {
    future: {
      v7_startTransition: true,
    }}

);

  return <RouterProvider router={router} />; //следит за адресной строкой и определяет кую страницу отрисовать
}

export default App;


//RouterProvider - отслеживает HTTP routes - работает как финальный рендер в который мы грузим все что должен плоучить клиент
//createBrowserRouter - создает уже сму страницу согласно роуту