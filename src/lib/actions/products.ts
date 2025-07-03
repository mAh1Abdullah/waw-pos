'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '@/lib/db/products';
import { NewProduct, Product } from '@/lib/db/products';

export async function fetchProducts(): Promise<Product[]> {
  return getProducts();
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  return getProductById(id);
}

export async function addProduct(product: NewProduct) {
  try {
    await createProduct(product);
  } catch (error) {
    return {
      success: false,
      message: 'Database Error: Failed to Create Product.',
    };
  }

  revalidatePath('/inventory');
  redirect('/inventory');
}

export async function editProduct(id: string, product: Partial<NewProduct>) {
  try {
    await updateProduct(id, product);
  } catch (error) {
    return {
      success: false,
      message: 'Database Error: Failed to Update Product.',
    };
  }

  revalidatePath('/inventory');
  redirect('/inventory');
}

export async function removeProduct(id: string): Promise<void> {
  try {
    await deleteProduct(id);
    revalidatePath('/inventory');
  } catch (error) {
    throw new Error('Database Error: Failed to Delete Product.');
  }
}
