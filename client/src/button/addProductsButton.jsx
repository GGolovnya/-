import {  Button } from "@nextui-org/react";
import { postProduct } from "../service/databaseService"; // Добавить этот импорт

// Компонент кнопки с обработчиком клика
export function AddProductsButton({ productData }) {
  const handleAddProduct = async () => {
    try {
      const response = await postProduct(productData);
      console.log('Product added:', response);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Button onClick={handleAddProduct}>
      ДОБАВИТЬ ПРОДУКТ
    </Button>
  );
}