// Products.jsx
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../service/databaseService';
import { DelateProductsButton } from "../button/delateProductsButton";

export function Products({ products, setProducts }) {
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (err) {
            setError('Ошибка при загрузке продуктов');
            console.error('Ошибка загрузки:', err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Список продуктов:</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <ul>
                {products.map((product) => (
                    <li key={product.id}> {product.title} <DelateProductsButton/> </li>
                ))}
            </ul>
        </div>
    );
}