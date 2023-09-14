import React from 'react';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { Product } from '../Types/Product';


interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { increaseItemQuantity, getItemQuantity } = useShoppingCart();
  const formattedPrice = typeof product.price === 'number' ? product.price.toFixed(2) : product.price;

  const handleAddToCart = () => {
   increaseItemQuantity(product.id);
  }

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
          <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
        </div>
        <p>Quantity in Cart: {getItemQuantity(product.id)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
