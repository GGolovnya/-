import React from 'react';
import {BlockButton} from '../block/blockButton';

const ContentPage = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <h1 className="text-2xl font-bold">Страница называется ContentPage.jsx</h1>
            <p className="text-lg">Маршрут у этой страницы /content </p>
            <BlockButton />
        </div>
    );
}

export default ContentPage;