import React from 'react';
import ReactDOM from 'react-dom/client';
import {NextUIProvider} from "@nextui-org/react"; //подтягивание стиля NextUI
import { ThemeProvider } from 'next-themes'; //оборачивание приложения в стиль NextUI
import App from './App';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  //оборачиваем приложение в NextUI
  <React.StrictMode>
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="system">
        <App/>
      </ThemeProvider>
    </NextUIProvider>
  </React.StrictMode>
);