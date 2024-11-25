// components/Sellers.jsx
import React, { useState, useEffect } from 'react';
import { getAllSellers } from '../service/databaseService';

export function Sellers() {
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const data = await getAllSellers();
        setSellers(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSellers();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {sellers.map(seller => (
        <div key={seller.id} className="flex-grow py-2">
          Должность: {seller.title} Имя: {seller.name} {seller.id}
        </div>
      ))}
    </div>
  );
}