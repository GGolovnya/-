
// AddProductsButton.jsx
import { Button } from "@nextui-org/react";
import { postProduct } from "../service/databaseService";

export function EditingProductsButton({ productData, onProductAdded }) {
    const handleAddProduct = async () => {
        try {
            const response = await postProduct(productData);
            console.log('Продукт добавлен:', response);
            if (onProductAdded) {
                onProductAdded(response); // передаем новый продукт
            }
        } catch (error) {
            console.error('Ошибка при добавлении продукта:', error);
        }
    };

    return (
        <Button onClick={handleAddProduct}>
            Редактировать продукт
        </Button>
    );
}
