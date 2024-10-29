import { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import heart from '../assets/Heart.svg';
import filledHeart from '../assets/filledHeart.svg'; 
import shoe1 from '../assets/shoe1.png';
import shoe2 from '../assets/shoe2.png';
import axios from 'axios';
import { CartContext } from './cartContext';

const HomePage = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [products, setProducts] = useState([]);
    const { cart, addToCart, removeFromCart } = useContext(CartContext);
    const baseURL = 'http://localhost:8080/api';
    const [token, setToken] = useState(""); 

   
    useEffect(() => {
        
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken || ""); 
        }
    }, []); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${baseURL}/products`);
                const productsData = response.data || [];
                setProducts(productsData.slice(1, 9)); 
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        const fetchWishlist = async () => {
            if (token) { 
                try {
                    const response = await axios.get(`${baseURL}/products/wishlist`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setWishlist(response.data.map(product => product.id));
                } catch (error) {
                    console.log('Error fetching wishlist:', error);
                }
            }
        };

        fetchProducts();
        fetchWishlist();
    }, [token]); 

    const toggleWishlist = async (productId) => {
        try {
            if (wishlist.includes(productId)) {
                await axios.delete(`${baseURL}/products/remove`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { productId }
                });
                setWishlist(wishlist.filter(id => id !== productId));
            } else {
                await axios.post(`${baseURL}/products/add`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { productId }
                });
                setWishlist([...wishlist, productId]);
            }
        } catch (error) {
            console.error('Error updating wishlist:', error);
        }
    };

    const isProductInCart = (productId) => {
        return cart?.some((cartItem) => cartItem.id === productId) || false;
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4;

    const handleNext = () => {
        if (currentIndex + itemsPerPage < products.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (currentIndex - itemsPerPage >= 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    const currentProducts = products.slice(currentIndex, currentIndex + itemsPerPage);

    const goToProductPage = (productId) => {
        window.location.href = `/product/${productId}`;
    };

    return (
        <div className="mx-4 md:mx-10 lg:mx-28">
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="font-teko text-[60px] sm:text-[120px] md:text-[160px] lg:text-[200px] xl:text-[280px] text-gray-300 font-bold leading-none">
                    SHOP ALL
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-6 p-4">
                {products.map((product) => (
                    <div key={product.id} className="relative group border rounded-lg overflow-hidden flex flex-col justify-between m-2">
                        <div onClick={() => goToProductPage(product.id)} className="cursor-pointer">
                            <Image
                                src={`${baseURL}${product.imagePath}`}
                                alt={product.name}
                                width={270}
                                height={250}
                                className="object-cover w-full h-auto"
                            />
                        </div>
                        <div
                            className="absolute top-4 right-4 cursor-pointer"
                            onClick={() => toggleWishlist(product.id)}
                        >
                            <Image
                                src={wishlist.includes(product.id) ? filledHeart : heart}
                                alt="Wishlist Heart"
                                width={24}
                                height={24}
                                className={`transition-colors ${wishlist.includes(product.id) ? "text-red-500" : "text-gray-500"}`}
                            />
                        </div>

                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p className="text-gray-500">${product.price.toFixed(2)}</p>
                            <div className="flex-grow"></div>

                            {isProductInCart(product.id) ? (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromCart(product);
                                    }}
                                    className="w-full bg-red-500 text-white font-semibold py-2 px-4 text-center hover:bg-red-600 mt-4"
                                >
                                    Remove from Cart
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(product);
                                    }}
                                    className="w-full bg-black text-white font-semibold py-2 px-4 text-center hover:bg-gray-800 mt-4"
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <hr className="border-gray-300 mx-28" />
            <div className="flex flex-col md:flex-row justify-center items-center mt-20 pt-10">
                <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
                    <Image
                        src={shoe1}
                        alt="Left Image"
                        width={618}
                        height={831}
                        className="h-auto object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 flex justify-center mt-6 pt-52 md:mt-0">
                    <Image
                        src={shoe2}
                        alt="Right Image"
                        width={618}
                        height={831}
                        className="h-auto object-cover"
                    />
                </div>
            </div>

            <div className="mt-52 flex flex-col ml-20">
                <div className="font-geist text-3xl flex space-x-2">
                    <span className="font-cabinet-grotesk text-black relative">
                        <span className="absolute inset-0 text-white -translate-x-0.5 -translate-y-0.5">BEST  </span>
                        BEST
                    </span>
                    <span className="font-cabinet-grotesk text-black relative">
                        <span className="absolute inset-0 text-black -translate-x-0.5 -translate-y-0.5">SELL</span>
                        SELL
                    </span>
                    <span className="font-cabinet-grotesk text-black relative">
                        <span className="absolute inset-0 text-white -translate-x-0.5 -translate-y-0.5">ING</span>
                        ING
                    </span>
                </div>
                <div className="flex items-end justify-end pr-20">
                <button onClick={handlePrev} className="mr-5 p-2">←</button>
                <button onClick={handleNext} className="p-2 mr-4">→</button>
            </div>
            </div>

            <div className="flex justify-center items-center mt-20 mb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-11/12">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="relative group" onClick={() => goToProductPage(product.id)}>
                            <Image
                                src={`${baseURL}${product.imagePath}`}
                                alt={product.name}
                                width={270}
                                height={250}
                                className="rounded-lg h-72 w-full object-cover"
                            />
                            <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-500">${product.price.toFixed(2)}</p>
                            <div
                                className="absolute top-4 right-4 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleWishlist(product.id);
                                }}
                            >
                                <Image
                                    src={wishlist.includes(product.id) ? filledHeart : heart}
                                    alt="Wishlist Heart"
                                    width={24}
                                    height={24}
                                    className={`transition-colors ${wishlist.includes(product.id) ? "text-red-500" : "text-gray-500"}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
