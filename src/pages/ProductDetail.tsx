import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../Hooks/useProductData';
import Section from '../components/Section';


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
    <>
    <Section page="Products Description" description="Read more here about your selected product"/>
    <div className="product-details-container">
      <div className='text-container-details'>
      <h2>{product.name}</h2>
      <div className='description-container-details'>
      <p>{product.description}</p>
      </div>
      <p className='price-details'>Price: ${product.price.toFixed(2)} SEK</p>
      </div>
      <div className='img-container-details'>
      <img src={product.imgURL} alt={product.name} />
      </div>
    </div>
    </>
  );
};

export default ProductDetail;
