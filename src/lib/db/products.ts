import { InferInsertModel, InferSelectModel, eq } from 'drizzle-orm';
import { db } from './';
import { products } from './schema';

export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;

export async function getProducts(): Promise<Product[]> {
  return db.select().from(products);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return db.select().from(products).where(eq(products.id, id)).get();
}

export async function createProduct(product: NewProduct): Promise<Product> {
  try {
    const result = await db.insert(products).values(product);
    return result;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

export async function updateProduct(id: string, product: Partial<NewProduct>): Promise<Product | undefined> {
  try {
    const result = await db.update(products).set(product).where(eq(products.id, id)).returning();
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  await db.delete(products).where(eq(products.id, id)).run();
}
