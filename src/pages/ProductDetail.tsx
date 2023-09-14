import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../Hooks/useProductData';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log('ID from URL:', id);
  const products = useProducts();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const selectedProduct = products.find(item => item.id === id);

    if (selectedProduct) {
      setProduct(selectedProduct);
    } else {
      setProduct(null); // or any other appropriate value
    }
  }, [id, products]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)} SEK</p>
      <img src={product.imgURL} alt={product.name} />
    </div>
  );
};

export default ProductDetail;
