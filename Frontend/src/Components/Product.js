import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/user/get-product"); // Adjust the endpoint as needed
      console.log(response);
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.descriptions}</p>
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100px', height: '100px' }} // Adjust as needed
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;