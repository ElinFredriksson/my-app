
import CartProduct from './CartProduct';
import { useShoppingCart } from '../context/ShoppingCartContext';

const ShoppingCart = () => {
  const { cartItems, closeCart } = useShoppingCart();

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.map(item => (
        <CartProduct
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            
        />
        ))}
      <button onClick={closeCart}>Close</button>
    </div>
  );
}

export default ShoppingCart;
