import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCartFromLocalStorage } from '../helpers/localStorage';


type ShoppingCartContextType = {
    cartItems: CartType[];
    isOpen: boolean; 
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: string) => number;
    addToCart: (product: Product) => void; 
    increaseItemQuantity: (id: string) => void;
    decreaseItemQuantity: (id: string) => void;
    removeFromCart: (id: string) => void;
};


const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export const useShoppingCart = () => {
    const context = useContext(ShoppingCartContext);
    if (!context) {
        throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
    }
    return context;
};

type ShoppingCartProviderProps = {
    children: React.ReactNode;
};

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartType[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const loadCartFromLocalStorage = () => {
      const storedCart = getCartFromLocalStorage(); // Using the imported function
      setCartItems(storedCart);
  };

    const getItemQuantity = (id: string) => {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    };

    const addToCart = (product: Product) => {
        const productIndex = cartItems.findIndex(item => item.id === product.id);
        if (productIndex !== -1) {
            setCartItems(prev => {
                const newCart = [...prev];
                newCart[productIndex] = { ...newCart[productIndex], quantity: newCart[productIndex].quantity + 1 };
                return newCart;
            });
        } else {
            setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
        }
    };

    const _modifyItemQuantity = (prevState: CartType[], index: number, modifier: number) => {
        const newCart = [...prevState];
        newCart[index] = { ...newCart[index], quantity: newCart[index].quantity + modifier };
        return newCart;
    }

    const increaseItemQuantity = (id: string) => {
        const productIndex = cartItems.findIndex(item => item.id === id);
        setCartItems(prev => {
          if (productIndex !== -1) {
              return _modifyItemQuantity(prev, productIndex, 1);
          }
          return prev
        });


    };

    const decreaseItemQuantity = (id: string) => {
        const productIndex = cartItems.findIndex(item => item.id === id);
        setCartItems(prev => {
            if (productIndex !== -1) {
                const newCart = _modifyItemQuantity(prev, productIndex, -1);
                if (newCart[productIndex].quantity === 0) {
                    return newCart.filter(item => item.id !== id);
                }
                return newCart;
            }
            return prev;
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };



    useEffect(() => {
        loadCartFromLocalStorage();
    }, []);

    return (
        <ShoppingCartContext.Provider value={{
            cartItems,
            isOpen,
            openCart,
            closeCart,
            addToCart,
            getItemQuantity,
            increaseItemQuantity,
            decreaseItemQuantity,
            removeFromCart
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};
