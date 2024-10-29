import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const CategoryPage = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); 

    const baseURL = 'http://localhost:8080/api';

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await axios.get(`${baseURL}/products/prodCategory?category=${router.query.category}`);
                if (response.status === 200) {
                    setProducts(response.data); 
                } else {
                    setError(`Error: Received status ${response.status}`);
                }
            } catch (error) {
                if (error.response) {
                    setError(`Server error: ${error.response.status} - ${error.response.data.message || error.message}`);
                } else if (error.request) {
                    setError('No response received from the server.');
                } else {
                    setError(`Request error: ${error.message}`);
                }
            } finally {
                setLoading(false);
            }
        };

        if (router.isReady && router.query.category) {
            fetchProducts();
        }
    }, [router.isReady, router.query.category]); 
    const goToProductPage = (productId) => {
        window.location.href = `/product/${productId}`;
    };

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-600">Error: {error}</p>;

    return (
        <div className="mx-4 md:mx-10 lg:mx-28 pb-12">
            <h1 className="text-2xl font-bold">{router.query.category} Products</h1>
            {products.length === 0 ? (
                <p>No products found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-6 p-4">
                    {currentProducts.map(product => (
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
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-between mt-4">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1} 
                    className={`px-4 py-2 bg-black text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages} 
                    className={`px-4 py-2 bg-black text-white rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default CategoryPage;
