'use client';

import { useState } from 'react';
import ProductTable from '@/components/products/product-table';
import ProductForm from '@/components/products/product-form';
import { Product } from '@/lib/db/products';

interface InventoryClientProps {
  products: Product[];
}

export default function InventoryClient({ products: initialProducts }: InventoryClientProps) {
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <ProductTable products={products} onEdit={handleEdit} />
      </div>
      <div className="md:col-span-1">
        <ProductForm initialData={editingProduct} />
      </div>
    </div>
  );
}
