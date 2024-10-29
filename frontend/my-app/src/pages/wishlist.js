import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const WishlistPage = () => {
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const baseURL = 'http://localhost:8080/api';
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get(`${baseURL}/products/wishlist`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setWishlistProducts(response.data);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };
        fetchWishlist();
    }, [token]);

    const handleRemoveFromWishlist = async (productId) => {
        try {
            await axios.delete(`${baseURL}/products/remove`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { productId}
            });
            setWishlistProducts(wishlistProducts.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error removing product from wishlist:', error);
        }
    };

    return (
        <div className="wishlist-container mx-4 md:mx-10 lg:mx-28 pb-56">
            <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
            {wishlistProducts.length === 0 ? (
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-lg">Your wishlist is empty!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                    {wishlistProducts.map(product => (
                        <div key={product.id} className="relative group border rounded-lg overflow-hidden flex flex-col justify-between">
                            <div className="cursor-pointer">
                                <Image
                                    src={`${baseURL}${product.imagePath}`}
                                    alt={product.name}
                                    width={270}
                                    height={250}
                                    className="object-cover w-full h-48"
                                />
                            </div>
                            <div className="p-4 flex flex-col">
                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                <p className="text-gray-500">${product.price.toFixed(2)}</p>
                                <button
                                    onClick={() => handleRemoveFromWishlist(product.id)}
                                    className="w-full bg-red-500 text-white font-semibold py-2 px-4 text-center hover:bg-red-600 mt-4"
                                >
                                    Remove from Wishlist
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
