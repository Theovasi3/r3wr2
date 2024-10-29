import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { CartContext } from './cartContext';
import axios from 'axios';

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkoutMessage, setCheckoutMessage] = useState('');
    const baseURL = 'http://localhost:8080/api';

    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
    }, [cart]);

    const handleCheckout = async () => {
        const token = localStorage.getItem('token'); 
    
        try {
            console.log("i tried")
            const response = await axios.post(`${baseURL}/orders/checkout`, {
                productIds: cart.map((item) => item.id),
            }, {
                headers: { 
                    'Authorization': `Bearer ${token}`
                }
            });
            
    
            setCheckoutMessage('Checkout successful! Your order has been placed.');
            clearCart();
        } catch (error) {
            setCheckoutMessage('Checkout failed. Please try again.');
            console.error('Error during checkout:', error);
        }
    };
    

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-3xl font-semibold">Your cart is empty!</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-10">Your Cart</h1>

            {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border p-4 rounded-lg">
                    <Image
                        src={`${baseURL}${item.imagePath}`}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="object-cover w-24 h-24"
                    />
                    <div>
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                    <button onClick={() => removeFromCart(item)} className="bg-red-500 text-white px-4 py-2">
                        Remove from Cart
                    </button>
                </div>
            ))}

            <h2 className="text-xl font-bold mt-8">Total Price: ${totalPrice.toFixed(2)}</h2>

            <div className="mt-6">
                <button onClick={clearCart} className="bg-gray-500 text-white px-4 py-2 mr-4">
                    Clear Cart
                </button>
                <button onClick={handleCheckout} className="bg-green-500 text-white px-4 py-2">
                    Checkout
                </button>
            </div>

            {checkoutMessage && (
                <div className="mt-6 text-center">
                    <p className={`text-lg font-semibold ${checkoutMessage.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                        {checkoutMessage}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Cart;
