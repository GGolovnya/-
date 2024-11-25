// EditingProductsButton.jsx
import { Button } from "@nextui-org/react";

export function EditingProductsButton({ product, onEdit }) {
    const handleEdit = () => {
        if (onEdit) {
            onEdit(product);
        }
    };

    return (
        <Button onClick={handleEdit}>
            РЕДАКТИРОВАТЬ
        </Button>
    );
}