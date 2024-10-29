import { useEffect, useState } from 'react';
import axios from 'axios';

const EditProduct = () => {
    const [productDetails, setProductDetails] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        imagePath: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const baseURL = 'http://localhost:8080/api';
    const [id, setId] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const productId = window.location.pathname.split('/').pop();
            setId(productId);
        }
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${baseURL}/products/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setProductDetails(response.data); 
            } catch (error) {
                console.error("Error fetching product data:", error);
                setError('Failed to fetch product.');
            } finally {
                setFetching(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({
            ...productDetails,
            [name]: value,
        });
    };

    const handleEditProduct = async () => {
        const token = localStorage.getItem('token');
        setLoading(true);
        try {
            await axios.put(`${baseURL}/products/${id}`, productDetails, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert('Product updated successfully');
            window.location.href = '/viewProducts';
        } catch (error) {
            console.error("Error updating product:", error);
            setError('Failed to update product.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async () => {
        const token = localStorage.getItem('token');
        setLoading(true);
        try {
            await axios.delete(`${baseURL}/products/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert('Product deleted successfully');
            window.location.href = '/viewProducts';
        } catch (error) {
            console.error("Error deleting product:", error);
            setError('Failed to delete product.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        window.history.back(); 
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {fetching ? (
                    <p>Loading product data...</p>
                ) : (
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={productDetails.name} 
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                aria-required="true"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={productDetails.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                rows="3"
                                aria-required="true"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={productDetails.price}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                aria-required="true"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={productDetails.stock}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                aria-required="true"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Image Path</label>
                            <input
                                type="text"
                                name="imagePath"
                                value={productDetails.imagePath}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                aria-required="true"
                            />
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={handleEditProduct}
                                className="px-4 py-2 bg-black text-white rounded-md"
                                disabled={loading}
                                aria-label="Edit product"
                            >
                                {loading ? 'Updating...' : 'Edit'}
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteProduct}
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                                disabled={loading}
                                aria-label="Delete product"
                            >
                                {loading ? 'Deleting...' : 'Delete'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                                aria-label="Cancel editing"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
};

export default EditProduct;
