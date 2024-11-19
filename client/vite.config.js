import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Конфигурация Vite для React-приложения
export default defineConfig({
  // Подключаем плагин для поддержки React
  plugins: [react()],
  server: {
    // Настройка прокси для API-запросов
    proxy: {
      // Все запросы, начинающиеся с '/api', будут перенаправлены на http://localhost:3001
      '/api': 'http://localhost:3001',
    },
  },
});