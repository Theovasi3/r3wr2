import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); 

    const addToCart = (product) => {
        setCart((prevCart) => {
            const isProductInCart = prevCart.some((item) => item.id === product.id);
            if (!isProductInCart) {
                return [...prevCart, product];
            }
            return prevCart; 
        });
    };

    const removeFromCart = (product) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};