// Products.jsx
import React, { useEffect, useState } from 'react';
import { Input } from "@nextui-org/react";
import { getAllProducts, updateProduct, updatePatchProduct } from '../service/databaseService';
import { DelateProductsButton } from "../button/delateProductsButton";
import { EditingProductsButton } from "../button/editingProductsButton";
import { EditingPatchProductsButton } from "../button/editingPatchProductsButton";

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

    const handleInputChange = (productId, field, value) => {
        setEditValues(prev => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                [field]: value
            }
        }));
    };

    // PATCH - частичное обновление (обновляются только указанные поля)
    const handlePartialEdit = async (product) => {
        const updates = editValues[product.id];
        // Проверяем есть ли хотя бы одно поле для обновления
        if (!updates || Object.keys(updates).length === 0) {
            setError('Необходимо заполнить хотя бы одно поле');
            return;
        }
        try {
            // Отправляем только заполненные поля
            const updatedProduct = await updatePatchProduct(product.id, updates);
            setProducts(prevProducts => 
                prevProducts.map(p => p.id === product.id ? updatedProduct : p)
            );
            setEditValues(prev => ({
                ...prev,
                [product.id]: {}
            }));
        } catch (error) {
            console.error('Error patching product:', error);
            setError('Ошибка при частичном обновлении продукта');
        }
    };

    // PUT - полное обновление (все поля должны быть указаны)
    const handleFullEdit = async (product) => {
        const updates = editValues[product.id];
        // Для PUT необходимы все поля
        if (!updates?.title || !updates?.price || !updates?.weight) {
            setError('Для полного обновления необходимо заполнить ВСЕ поля');
            return;
        }
        try {
            // Отправляем полный объект для замены
            const updatedProduct = await updateProduct(product.id, updates);
            setProducts(prev => prev.map(p => p.id === product.id ? updatedProduct : p));
            setEditValues(prev => ({ ...prev, [product.id]: {} }));
        } catch (error) {
            setError('Ошибка при полном обновлении');
        }
    };

    return (
        <div>
            <h2>Список продуктов:</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <div>
                            <h3>Текущие данные продукта:</h3>
                            <p>Название: {product.title}, Цена: {product.price}, Вес: {product.weight}</p>
                            
                            <h3>PUT - Полное обновление (заменит ВСЕ поля)</h3>
                            <Input
                                value={editValues[product.id]?.title || ''}
                                onChange={(e) => handleInputChange(product.id, 'title', e.target.value)}
                                placeholder="Новое название"
                            />
                            <EditingProductsButton 
                                onEdit={() => handleFullEdit(product)}
                                product={product}
                            />
                            
                            <h3>PATCH - Частичное обновление (изменит только заполненные поля)</h3>
                            <Input
                                value={editValues[product.id]?.title || ''}
                                onChange={(e) => handleInputChange(product.id, 'title', e.target.value)}
                                placeholder="Название"
                            />
                            <Input
                                value={editValues[product.id]?.price || ''}
                                onChange={(e) => handleInputChange(product.id, 'price', e.target.value)}
                                placeholder="Цена"
                            />
                            <Input
                                value={editValues[product.id]?.weight || ''}
                                onChange={(e) => handleInputChange(product.id, 'weight', e.target.value)}
                                placeholder="Вес"
                            />
                            <EditingPatchProductsButton 
                                onEdit={() => handlePartialEdit(product)}
                            />
                        </div>
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