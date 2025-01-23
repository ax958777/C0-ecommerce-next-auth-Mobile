'use client';
import React, { useState, useEffect } from 'react';
import { Product } from "@/models/Product";
import { useParams } from 'next/navigation';
import { useCartStore } from "@/store/cartStore";
import { Carousel } from 'flowbite-react';

const ProductDetailsPage = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const { id } = useParams();
    const { addItem } = useCartStore();

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`/api/products/${id}`);
            if (response.ok) {
                const data = await response.json();
                setProduct(data);
            } else {
                console.error('Failed to fetch product');
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        if (product) {
            addItem(product);
        }
    };

    return (
        <div className="container mx-auto p-4 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-4 text-center">{product.name}</h1>
            <div className="w-full h-96">
                <Carousel>
                    {product.images && product.images.map((image, index) => (
                        <div key={index} className="flex justify-center items-center">
                            <img src={image} alt={product.name} className="max-h-96 object-contain" />
                        </div>
                    ))}
                </Carousel>
            </div>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-xl font-bold text-center">${product.price}</p>
            <button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductDetailsPage;
