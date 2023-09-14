import { CartType } from "../types/CartItem";

const CART_STORAGE_KEY = '@LS_CART';


type StorageKey = typeof CART_STORAGE_KEY ;

const getFromLocalStorage = (key: StorageKey) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

const saveToLocalStorage = (key: StorageKey, data: any) => {
    const stringifiedData = JSON.stringify(data);

    localStorage.setItem(key, stringifiedData);
}

export const getCartFromLocalStorage = (): CartType[] => {
    return getFromLocalStorage(CART_STORAGE_KEY) || [];
}

export const saveCartToLocalStorage = (threads: CartType[]) => {
    saveToLocalStorage(CART_STORAGE_KEY, threads);
}


export const removeFromLocalStorage = (key: StorageKey) => {
    localStorage.removeItem(key);
}

export const clearLocalStorage = () => {
    localStorage.clear();
}