import React from 'react';
import { MyButton } from '../button/MyButton';

const WelcomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <h1 className="text-2xl font-bold">Страница называется WelcomePage.jsx</h1>
            <p className="text-lg">Маршрут у этой страницы / </p>
            <MyButton />
        </div>
    );
}

export default WelcomePage;