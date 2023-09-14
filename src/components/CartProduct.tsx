
import { useShoppingCart } from '../context/ShoppingCartContext';
// import { useProducts } from '../Hooks/useProductData';
// import { CartItem } from '../Types/CartItem';
import { Product } from '../Types/Product';

interface CartProductProps {
    id: string;
    name: string;
    price: number;
    quantity: number;
    
  }

const CartProduct: React.FC<CartProductProps> = ({ id, name, price, quantity }) => {
  const { cartItems, openCart, closeCart, getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart } = useShoppingCart();

  return (
    <div className="d-flex justify-content-between align-items-center p-2 gap-3">
      <div>
        <p className='m-0'>{name} - {quantity}</p>
        <p className='cartProduct-price'>{quantity} x {price} kr</p>
      </div>
      <div className='buttons d-flex gap-1'>
        <div className='btn-group btn-group-sm' role='group'>
          <button className='btn btn-sm' onClick={() => decreaseItemQuantity(id)}>-</button>
          <button className='btn btn-sm' onClick={() => increaseItemQuantity(id)}>+</button>
        </div>
        <button className='btn btn-sm btn-danger' onClick={() => removeFromCart(id)}>Remove</button>
      </div>
    </div>
  );
}

export default CartProduct;
