import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

const ViewProducts = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;
    const baseURL = 'http://localhost:8080/api';

    const fetchProducts = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${baseURL}/products`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setProducts(response.data);
        } catch (error) {
            setError('Failed to fetch products.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${baseURL}/products/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            setError('Failed to delete product.');
        }
    };

    const goToEditProduct = (productId) => {
        window.location.href = `/editProduct/${productId}`;
    };

    const goToAddProduct = () => {
        window.location.href = '/addProduct'; 
    };

    const totalPages = Math.ceil(products.length / productsPerPage);
    const currentProducts = products.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <main className="flex items-start justify-center min-h-screen bg-gray-100 pt-10 pb-10">
            <div className="bg-white shadow-md rounded-lg p-8 w-3/4">
                <h1 className="text-2xl font-semibold mb-6 flex justify-between items-center">
                    Product Management
                    <button
                        onClick={goToAddProduct}
                        className="px-4 py-2 bg-black text-white rounded"
                    >
                        Add Product
                    </button>
                </h1>
                {error && <p className="text-red-500">{error}</p>}
                {loading ? (
                    <p>Loading products...</p>
                ) : (
                    <>
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 p-4">Photo</th>
                                    <th className="border border-gray-300 p-4">Product Name</th>
                                    <th className="border border-gray-300 p-4">Description</th>
                                    <th className="border border-gray-300 p-4">Price</th>
                                    <th className="border border-gray-300 p-4">Stock</th>
                                    <th className="border border-gray-300 p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.length > 0 ? (
                                    currentProducts.map(product => (
                                        <tr key={product.id}>
                                            {product.imagePath ? (
                                                <td className="border border-gray-300 p-4">
                                                    <Image 
                                                        src={`${baseURL}${product.imagePath}`}
                                                        alt={product.name}
                                                        width={270}
                                                        height={250}
                                                        className="object-cover w-full h-48"
                                                    />
                                                </td>
                                            ) : (
                                                <td className="border border-gray-300 p-4">No Image</td> 
                                            )}
                                            <td className="border border-gray-300 p-4">{product.name}</td>
                                            <td className="border border-gray-300 p-4">{product.description}</td>
                                            <td className="border border-gray-300 p-4">${product.price.toFixed(2)}</td>
                                            <td className="border border-gray-300 p-4">{product.stock}</td>
                                            <td className="border border-gray-300 p-4">
                                                <button
                                                    className="mr-2 px-2 py-1 bg-black text-white rounded"
                                                    onClick={() => goToEditProduct(product.id)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="px-2 py-1 bg-red-500 text-white rounded"
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center p-4">No products found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-black text-white hover:bg-gray-700'}`}
                            >
                                Previous
                            </button>
                            <p>Page {currentPage} of {totalPages}</p>
                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-black text-white hover:bg-gray-700'}`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default ViewProducts;
