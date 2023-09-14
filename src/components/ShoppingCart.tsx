
import CartProduct from './CartProduct';
import { useShoppingCart } from '../context/ShoppingCartContext';

const ShoppingCart = () => {
  const { cartItems, isOpen,  closeCart } = useShoppingCart();
 
  if (!isOpen) return null;

  return (
    <div>
      <h1>Shopping Cart</h1>
      
      {cartItems.map(item => (
        <CartProduct
            key={item.id}
            cartItem={item}
            
        />
        ))}
      <button onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        closeCart();
      }}>Close</button>
    </div>
  );
}

export default ShoppingCart;
