"use client"
import ProductList from '@/components/ProductList';
import React from 'react';

const ProductsPage: React.FC = () => {
  return (
    <div>
      <ProductList searchTerm="" />
    </div>
  );
};

export default ProductsPage;
