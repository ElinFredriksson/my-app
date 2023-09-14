// ShoppingCartContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartType } from '../Types/CartItem';
import { getCartFromLocalStorage, saveCartToLocalStorage } from '../helpers/localStorage';

type ShoppingCartContextType = {
    cartItems: CartType[];
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: string) => number;
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

    const increaseItemQuantity = (id: string) => {
        setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const decreaseItemQuantity = (id: string) => {
        setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
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
            openCart,
            closeCart,
            getItemQuantity,
            increaseItemQuantity,
            decreaseItemQuantity,
            removeFromCart
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};
