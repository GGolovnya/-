// DelateProductsButton.jsx
import { Button } from "@nextui-org/react";
import { deleteProduct } from "../service/databaseService";

export function DelateProductsButton({ productId, onProductDeleted }) {
    const handleDelete = async () => {
        try {
            await deleteProduct(productId);
            if (onProductDeleted) {
                onProductDeleted(productId);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <Button onClick={handleDelete}>
            УДАЛИТЬ
        </Button>
    );
}