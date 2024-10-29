import { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const baseURL = 'http://localhost:8080/api';

    useEffect(() => {
        const fetchOrders = async () => {
            const userId = localStorage.getItem('userId'); // Get userId from localStorage
            try {
                const response = await axios.get(`${baseURL}/orders/${userId}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-10">Your Orders</h1>
            {orders.length === 0 ? (
                <h2 className="text-xl text-center">You have no orders.</h2>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id} className="border p-4 rounded-lg mb-4">
                            <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
                            <p className="text-gray-500">Date: {new Date(order.orderDate).toLocaleString()}</p>
                            <p className="text-gray-500">Status: {order.status}</p>
                            <h3 className="font-bold mt-2">Products:</h3>
                            <ul>
                                {order.products.map((product) => (
                                    <li key={product.id} className="text-gray-700">
                                        {product.name} - ${product.price.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrdersPage;
