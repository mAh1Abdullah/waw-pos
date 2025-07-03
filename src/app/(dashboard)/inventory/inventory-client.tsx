'use client';

import { useState } from 'react';
import ProductTable from '@/components/products/product-table';
import ProductForm from '@/components/products/product-form';
import { Product } from '@/lib/db/products';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface InventoryClientProps {
  products: Product[];
}

export default function InventoryClient({ products: initialProducts }: InventoryClientProps) {
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleNewProductClick = () => {
    setEditingProduct(undefined);
    setDialogOpen(true);
  };

  const handleFormSuccess = () => {
    setDialogOpen(false);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <div className="flex justify-end mb-4">
          <Button onClick={handleNewProductClick}>Create Product</Button>
        </div>
        <ProductTable products={initialProducts} onEdit={handleEdit} />
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          <ProductForm initialData={editingProduct} onSuccess={handleFormSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
