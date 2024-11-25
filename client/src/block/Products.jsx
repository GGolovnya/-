// Products.jsx
import React, { useEffect, useState } from 'react';
import { Input } from "@nextui-org/react";
import { getAllProducts } from '../service/databaseService';
import { DelateProductsButton } from "../button/delateProductsButton";
import { EditingProductsButton } from "../button/editingProductsButton";

export function Products({ products, setProducts }) {
    const [error, setError] = useState(null);
    const [editValues, setEditValues] = useState({});
    
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

    const handleProductDeleted = (deletedProductId) => {
        setProducts(prevProducts => 
            prevProducts.filter(product => product.id !== deletedProductId)
        );
    };

    const handleInputChange = (productId, value) => {
        setEditValues({
            ...editValues,
            [productId]: value
        });
    };

    return (
        <div>
            <h2>Список продуктов:</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.title}
                        <Input 
                            onChange={(e) => handleInputChange(product.id, e.target.value)}
                            placeholder="Измените название продукта"
                        />
                        <EditingProductsButton 
                            onEdit={() => handleEdit(product)}
                            product={product}
                        />
                        <DelateProductsButton 
                            productId={product.id}
                            onProductDeleted={handleProductDeleted}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}