import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../Types/Product';



interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({
  product
}) => {
  // Check if price is a valid number before using toFixed
  const formattedPrice = typeof product.price === 'number' ? product.price.toFixed(2) : product.price;

  console.log(`Rendering ProductCard ${product.imgURL}`); 

  return (
    <div className="product-card">
      <img src={product.imgURL} alt={product.name} className="product-image" />
      <div className="product-details">
        <h2 className="product-title">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${formattedPrice}</p>
        <div className="button-container">
        <Link to={`/productdetail/${product.id}`} className="view-details-button">
            <button>Details</button>
        </Link>

          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

