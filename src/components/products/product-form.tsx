'use client';

import { addProduct, editProduct } from '@/lib/actions/products';
import { Product } from '@/lib/db/products';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

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
  onSuccess?: () => void;
}

export default function ProductForm({ initialData, onSuccess }: ProductFormProps) {
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
    if (isSubmitSuccessful) {
      if (!initialData) {
        reset();
      }
      onSuccess?.();
    }
  }, [isSubmitSuccessful, reset, initialData, onSuccess]);

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    if (initialData) {
      await editProduct(initialData.id, data);
    } else {
      await addProduct(data);
    }
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">Name</Label>
        <Input id="name" {...register('name')} className="col-span-3" />
        {errors.name && (
          <p className="col-span-4 text-right text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">Description</Label>
        <Textarea id="description" {...register('description')} className="col-span-3" />
        {errors.description && (
          <p className="col-span-4 text-right text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="sku" className="text-right">SKU</Label>
        <Input id="sku" {...register('sku')} className="col-span-3" />
        {errors.sku && (
          <p className="col-span-4 text-right text-sm text-red-500">{errors.sku.message}</p>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="unitPrice" className="text-right">Unit Price</Label>
        <Input id="unitPrice" type="number" {...register('unitPrice')} step="0.01" className="col-span-3" />
        {errors.unitPrice && (
          <p className="col-span-4 text-right text-sm text-red-500">{errors.unitPrice.message}</p>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="sellingPrice" className="text-right">Selling Price</Label>
        <Input id="sellingPrice" type="number" {...register('sellingPrice')} step="0.01" className="col-span-3" />
        {errors.sellingPrice && (
          <p className="col-span-4 text-right text-sm text-red-500">{errors.sellingPrice.message}</p>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="currentStock" className="text-right">Current Stock</Label>
        <Input id="currentStock" type="number" {...register('currentStock')} className="col-span-3" />
        {errors.currentStock && (
          <p className="col-span-4 text-right text-sm text-red-500">{errors.currentStock.message}</p>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="reorderLevel" className="text-right">Reorder Level</Label>
        <Input id="reorderLevel" type="number" {...register('reorderLevel')} className="col-span-3" />
        {errors.reorderLevel && (
          <p className="col-span-4 text-right text-sm text-red-500">{errors.reorderLevel.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Processing...' : (initialData ? 'Update Product' : 'Add Product')}
      </Button>
    </form>
  );
}

