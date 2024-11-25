// components/Products.jsx
import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../service/databaseService';

export function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          {product.title}
        </div>
      ))}
    </div>
  );
}