-- Add table migrations mapping to the newly introduced backend types

CREATE TABLE IF NOT EXISTS carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INT NOT NULL CHECK (quantity >= 1),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Note: We are using TEXT for user_id to simulate Auth or dummy strings since we don't have Supabase Auth enforced.

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  total_amount NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INT NOT NULL CHECK (quantity >= 1),
  price_at_time NUMERIC(10, 2) NOT NULL
);

-- Enable basic RLS policies for local testing (Open read/write for demo purposes)
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public carts" ON carts;
CREATE POLICY "Public carts" ON carts USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public orders" ON orders;
CREATE POLICY "Public orders" ON orders USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public order_items" ON order_items;
CREATE POLICY "Public order_items" ON order_items USING (true) WITH CHECK (true);
