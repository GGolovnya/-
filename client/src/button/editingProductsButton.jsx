// EditingProductsButton.jsx
import { Button } from "@nextui-org/react";

export function EditingProductsButton({ product, onEdit }) {
    return (
      <Button onClick={() => onEdit(product)}>
        ИЗМЕНИТЬ ЗАПИСЬ ЦЕЛИКОМ
      </Button>
    );
  }