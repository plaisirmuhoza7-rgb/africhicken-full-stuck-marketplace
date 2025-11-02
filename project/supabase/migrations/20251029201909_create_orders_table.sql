/*
  # Create orders table

  1. New Tables
    - `orders`
      - `id` (uuid, primary key) - Unique order identifier
      - `full_name` (text) - Customer's full name
      - `phone_number` (text) - Customer's phone number
      - `product` (text) - Product name/description
      - `quantity` (integer) - Number of items ordered
      - `total_price` (integer) - Total price in RWF
      - `status` (text) - Order status (pending, confirmed, completed)
      - `created_at` (timestamptz) - Order creation timestamp

  2. Security
    - Enable RLS on `orders` table
    - Add policy for anyone to insert orders (public ordering)
    - Add policy for authenticated users to view all orders (admin access)
    - Add policy for authenticated users to update order status (admin access)
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone_number text NOT NULL,
  product text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  total_price integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update order status"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);