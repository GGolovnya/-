import React, { useEffect, useState } from 'react';
import { Input } from "@nextui-org/react";
import { getAllProducts, updateProduct, updatePatchProduct } from '../service/databaseService';
import { DelateProductsButton } from "../button/delateProductsButton";
import { EditingProductsButton } from "../button/editingProductsButton";
import { EditingPatchProductsButton } from "../button/editingPatchProductsButton";

export function Products({ products, setProducts }) {
    const [error, setError] = useState(null);
    const [editValues, setEditValues] = useState({});
    const [patchValues, setPatchValues] = useState({});
    
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

    const handlePutInputChange = (productId, field, value) => {
        setEditValues(prev => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                [field]: value
            }
        }));
    };

    const handlePatchInputChange = (productId, field, value) => {
        setPatchValues(prev => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                [field]: value
            }
        }));
    };

    const handlePartialEdit = async (product) => {
        const updates = patchValues[product.id];
        if (!updates || Object.keys(updates).length === 0) {
            setError('Необходимо заполнить хотя бы одно поле');
            return;
        }
        try {
            const updatedProduct = await updatePatchProduct(product.id, updates);
            setProducts(prevProducts => 
                prevProducts.map(p => p.id === product.id ? updatedProduct : p)
            );
            setPatchValues(prev => ({
                ...prev,
                [product.id]: {}
            }));
        } catch (error) {
            console.error('Error patching product:', error);
            setError('Ошибка при частичном обновлении продукта');
        }
    };

    const handleFullEdit = async (product) => {
        const updates = editValues[product.id];
        if (!updates?.title) {
            setError('Введите название');
            return;
        }
        try {
            const updatedProduct = await updateProduct(product.id, updates);
            setProducts(prev => prev.map(p => p.id === product.id ? updatedProduct : p));
            setEditValues(prev => ({ ...prev, [product.id]: {} }));
        } catch (error) {
            setError('Ошибка при полном обновлении');
        }
    };

    return (
        <div>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <div>
                            <p>{product.title} Цена: {product.price} руб. Вес: {product.weight} кг.</p>
                            
                            <h3>PUT - Полное обновление (заменит ВСЕ поля)</h3>
                            <Input
                                value={editValues[product.id]?.title || ''}
                                onChange={(e) => handlePutInputChange(product.id, 'title', e.target.value)}
                                placeholder="Новое название"
                            />
                            <EditingProductsButton 
                                onEdit={() => handleFullEdit(product)}
                                product={product}
                            />
                            
                            <h3>PATCH - Частичное обновление (изменит только заполненные поля)</h3>
                            <Input
                                value={patchValues[product.id]?.title || ''}
                                onChange={(e) => handlePatchInputChange(product.id, 'title', e.target.value)}
                                placeholder="Название"
                            />
                            <Input
                                value={patchValues[product.id]?.price || ''}
                                onChange={(e) => handlePatchInputChange(product.id, 'price', e.target.value)}
                                placeholder="Цена"
                            />
                            <Input
                                value={patchValues[product.id]?.weight || ''}
                                onChange={(e) => handlePatchInputChange(product.id, 'weight', e.target.value)}
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