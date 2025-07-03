'use client';

import { Product } from '@/lib/db/products';
import { removeProduct } from '@/lib/actions/products';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

export default function ProductTable({ products, onEdit }: ProductTableProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await removeProduct(id);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Product List</h2>
      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
          {error}
        </div>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</TableHead>
              <TableHead className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SKU</TableHead>
              <TableHead className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Unit Price</TableHead>
              <TableHead className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Selling Price</TableHead>
              <TableHead className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</TableHead>
              <TableHead className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Reorder Level</TableHead>
              <TableHead className="relative"><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.unitPrice}</TableCell>
                <TableCell>{product.sellingPrice}</TableCell>
                <TableCell>{product.currentStock}</TableCell>
                <TableCell>{product.reorderLevel}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(product)} className="mr-2">Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
