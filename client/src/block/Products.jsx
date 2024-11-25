// Products.jsx
import React, { useEffect, useState } from 'react';
import { Input } from "@nextui-org/react";
import { getAllProducts, updateProduct } from '../service/databaseService';
import { DelateProductsButton } from "../button/delateProductsButton";
import { EditingProductsButton } from "../button/editingProductsButton";

export function Products({ products, setProducts }) {
    // Состояние для обработки ошибок
    const [error, setError] = useState(null);
    // Состояние для хранения значений редактирования
    const [editValues, setEditValues] = useState({});
    
    // Шаг 2: Функция загрузки продуктов
    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (err) {
            setError('Ошибка при загрузке продуктов');
            console.error('Ошибка загрузки:', err);
        }
    };

    // Запуск загрузки при монтировании компонента
    useEffect(() => {
        fetchProducts();
    }, []);

    // Шаг 3: Обработчик удаления продукта
    const handleProductDeleted = (deletedProductId) => {
        setProducts(prevProducts => 
            prevProducts.filter(product => product.id !== deletedProductId)
        );
    };

    // Шаг 4: Обработчик изменения значения в input
    const handleInputChange = (productId, value) => {
        setEditValues({
            ...editValues,
            [productId]: value
        });
    };

    // Шаг 5: Обработчик редактирования продукта
    const handleEdit = async (product) => {
        const newValue = editValues[product.id];
        if (!newValue) return; // Проверка на пустое значение

        try {
            // Отправка запроса на обновление
            const updatedProduct = await updateProduct(product.id, { title: newValue });
            // Обновление состояния списка продуктов
            setProducts(prevProducts => 
                prevProducts.map(p => 
                    p.id === product.id ? updatedProduct : p
                )
            );
            // Очистка поля ввода
            setEditValues(prev => ({
                ...prev,
                [product.id]: ''
            }));
        } catch (error) {
            console.error('Error updating product:', error);
            setError('Ошибка при обновлении продукта');
        }
    };

    // Шаг 6: Рендер компонента
    return (
        <div>
            <h2>Список продуктов:</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.title}
                        <Input 
                            value={editValues[product.id] || ''}
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