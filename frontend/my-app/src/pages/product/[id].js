import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';

const ProductPage = () => {
    const router = useRouter();
    const { id } = router.query; 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseURL = 'http://localhost:8080/api';

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${baseURL}/products/${id}`);
                    setProduct(response.data); 
                } catch (error) {
                    console.error('Error fetching product:', error);
                    setError('Failed to fetch product details.');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="flex flex-col md:flex-row items-center md:items-start p-6 md:p-16">
            <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-2xl font-semibold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
            </div>

            <div className="md:w-1/2 flex justify-center">
                <Image
                    src={`${baseURL}${product.imagePath}`} 
                    alt={product.name}
                    width={400}
                    height={400}
                    className="object-cover"
                />
            </div>
        </div>
    );
};

export default ProductPage;
