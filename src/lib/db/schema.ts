import { sql } from 'drizzle-orm';
import { index, integer, numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  sku: text('sku').unique().notNull(),
  unitPrice: numeric('unit_price', { precision: 10, scale: 2 }).notNull(),
  sellingPrice: numeric('selling_price', { precision: 10, scale: 2 }).notNull(),
  currentStock: integer('current_stock').notNull(),
  reorderLevel: integer('reorder_level').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().default(sql`CURRENT_TIMESTAMP`).$onUpdate(() => new Date()),
}, (table) => ({
  nameIndex: index('name_idx').on(table.name),
}));
