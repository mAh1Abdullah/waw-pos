import { fetchProducts } from '@/lib/actions/products';
import InventoryClient from './inventory-client';

export default async function InventoryPage() {
  const products = await fetchProducts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
      <InventoryClient products={products} />
    </div>
  );
}
