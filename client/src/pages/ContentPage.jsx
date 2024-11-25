import React from 'react';
import {Products} from "../block/Products"
import {Sellers} from "../block/Sellers"

const ContentPage = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <h1 className="text-2xl font-bold">Страница называется ContentPage.jsx</h1>
            <p className="text-lg">Маршрут у этой страницы /content </p>
            <Products />
            <Sellers/>

        </div>
    );
}

export default ContentPage;