'use client';

import { addProduct, editProduct } from '@/lib/actions/products';
import { Product } from '@/lib/db/products';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const productSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  description: z.string().optional(),
  sku: z.string().min(1, { message: 'SKU is required.' }),
  unitPrice: z.coerce.number().min(0, { message: 'Unit price must be a positive number.' }),
  sellingPrice: z.coerce.number().min(0, { message: 'Selling price must be a positive number.' }),
  currentStock: z.coerce.number().int().min(0, { message: 'Current stock must be a non-negative integer.' }),
  reorderLevel: z.coerce.number().int().min(0, { message: 'Reorder level must be a non-negative integer.' }),
});

interface ProductFormProps {
  initialData?: Product;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      sku: '',
      unitPrice: 0,
      sellingPrice: 0,
      currentStock: 0,
      reorderLevel: 0,
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful && !initialData) {
      reset();
    }
  }, [isSubmitSuccessful, reset, initialData]);

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    if (initialData) {
      await editProduct(initialData.id, data);
    } else {
      await addProduct(data);
    }
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">{initialData ? 'Edit Product' : 'Add New Product'}</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" {...register('name')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        {errors.name && (
          <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" {...register('description')} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        {errors.description && (
          <p className="mt-2 text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
        <input type="text" id="sku" {...register('sku')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        {errors.sku && (
          <p className="mt-2 text-sm text-red-500">{errors.sku.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">Unit Price</label>
        <input type="number" id="unitPrice" {...register('unitPrice')} step="0.01" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        {errors.unitPrice && (
          <p className="mt-2 text-sm text-red-500">{errors.unitPrice.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700">Selling Price</label>
        <input type="number" id="sellingPrice" {...register('sellingPrice')} step="0.01" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        {errors.sellingPrice && (
          <p className="mt-2 text-sm text-red-500">{errors.sellingPrice.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="currentStock" className="block text-sm font-medium text-gray-700">Current Stock</label>
        <input type="number" id="currentStock" {...register('currentStock')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        {errors.currentStock && (
          <p className="mt-2 text-sm text-red-500">{errors.currentStock.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="reorderLevel" className="block text-sm font-medium text-gray-700">Reorder Level</label>
        <input type="number" id="reorderLevel" {...register('reorderLevel')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        {errors.reorderLevel && (
          <p className="mt-2 text-sm text-red-500">{errors.reorderLevel.message}</p>
        )}
      </div>
      <button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {isSubmitting ? 'Processing...' : (initialData ? 'Update Product' : 'Add Product')}
      </button>
    </form>
  );
}
