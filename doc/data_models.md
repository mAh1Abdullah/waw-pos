# Data Models

This document outlines the initial data models for the POS application, which will be implemented using Cloudflare D1 and Drizzle ORM.

## Product
Represents an inventory item.
- `id`: TEXT (Primary Key, UUID)
- `name`: TEXT (Product name, e.g., "Milk")
- `description`: TEXT (Optional, e.g., "Full cream milk")
- `sku`: TEXT (Stock Keeping Unit, unique identifier)
- `unit_price`: REAL (Cost price of the item)
- `selling_price`: REAL (Selling price of the item)
- `current_stock`: INTEGER (Current quantity in stock)
- `reorder_level`: INTEGER (Threshold for low stock alert)
- `created_at`: INTEGER (Unix timestamp)
- `updated_at`: INTEGER (Unix timestamp)

## Sale
Represents a sales transaction.
- `id`: TEXT (Primary Key, UUID)
- `transaction_date`: INTEGER (Unix timestamp of the sale)
- `total_amount`: REAL (Total amount of the sale)
- `payment_method`: TEXT (e.g., "Cash", "Card", "UPI")
- `created_at`: INTEGER (Unix timestamp)
- `updated_at`: INTEGER (Unix timestamp)

## SaleItem
Represents an item within a sales transaction (junction table for Sale and Product).
- `id`: TEXT (Primary Key, UUID)
- `sale_id`: TEXT (Foreign Key to Sale)
- `product_id`: TEXT (Foreign Key to Product)
- `quantity`: INTEGER (Quantity of the product sold in this transaction)
- `price_at_sale`: REAL (Selling price of the product at the time of sale)

## Expense
Represents a business expense.
- `id`: TEXT (Primary Key, UUID)
- `expense_date`: INTEGER (Unix timestamp of the expense)
- `category`: TEXT (e.g., "Rent", "Utilities", "Supplies", "Salaries")
- `amount`: REAL (Amount of the expense)
- `description`: TEXT (Optional, details about the expense)
- `created_at`: INTEGER (Unix timestamp)
- `updated_at`: INTEGER (Unix timestamp)
