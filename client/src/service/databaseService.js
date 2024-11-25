import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Получение всех продуктов из БД
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Добавление продукта в БД
export const postProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData);
    return response.data;
  } catch (error) {
    console.error('Error posting product:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
      const response = await axios.delete(`${API_URL}/products/${id}`);
      return response.data;
  } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
      const response = await axios.put(`${API_URL}/products/${id}`, productData);
      return response.data;
  } catch (error) {
      console.error('Error updating product:', error);
      throw error;
  }
};


//ВСЕ ДЛЯ ПРОДАВЦОВ

// Получение всех продавцов из БД
export const getAllSellers = async () => {
  try {
    const response = await axios.get(`${API_URL}/sellers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sellers:', error);
    throw error;
  }
};