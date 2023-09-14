
import CartProduct from './CartProduct';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { submitCart } from '../pages/AddProduct'

const ShoppingCart = () => {
  const { cartItems, isOpen,  closeCart } = useShoppingCart();
  

  const handleSubmit = () => {
    
    submitCart(cartItems);
  };
 
  if (!isOpen) return null;

  return (
    <div className='shoppingcart-div'>
      <h1 className='shoppingcart-heading'>Shopping Cart</h1>
      
      {cartItems.map(item => (
        <CartProduct
            key={item.id}
            cartItem={item}
            
        />
        ))}
      <button className='btn btn-danger me-4' onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        closeCart();
      }}>Close</button>
      <button className='btn btn-success' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ShoppingCart;
