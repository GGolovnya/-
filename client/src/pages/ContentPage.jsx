import React from 'react';
import {Card, Input} from '@nextui-org/react'
import {Products} from "../block/Products"
import {Sellers} from "../block/Sellers"
import {AddProductsButton} from "../button/addProductsButton"

const ContentPage = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <h1 className="text-2xl font-bold">Страница называется ContentPage.jsx</h1>
            <p className="text-lg">Маршрут у этой страницы /content </p>
            <Card className = "flex-grow mx-auto px-24 py-24 gap-4">
                <Products />
            </Card>
            <Input />
            <AddProductsButton />
            <Card className = "flex-grow mx-auto px-24 py-24 gap-4">
                <Sellers/>
            </Card>

        </div>
    );
}

export default ContentPage;