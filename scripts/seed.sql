-- Seed script for the ecommerce marketplace
-- Paste this entire script into the Supabase SQL Editor and click Run
-- This will: 1) create the reviews table if it doesn't exist, 2) insert ~200 products and reviews

-- Step 1: Create the reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_name   TEXT NOT NULL,
  rating      INT  NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (allow anyone to read reviews, only authenticated to write)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read reviews" ON reviews;
CREATE POLICY "Anyone can read reviews"
  ON reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can insert reviews" ON reviews;
CREATE POLICY "Anyone can insert reviews"
  ON reviews FOR INSERT WITH CHECK (true);

DO $$
DECLARE
  categories TEXT[] := ARRAY['Home Goods', 'Apparel', 'Jewelry', 'Art', 'Beauty', 'Food', 'Accessories'];
  adjectives TEXT[] := ARRAY['Handcrafted', 'Rustic', 'Vintage', 'Modern', 'Minimalist', 'Cozy', 'Organic', 'Sustainable', 'Artisanal', 'Bespoke', 'Colorful', 'Elegant'];
  nouns TEXT[]      := ARRAY['Ceramic Mug', 'Wooden Bowl', 'Linen Shirt', 'Silver Necklace', 'Soy Candle', 'Leather Wallet', 'Wall Art', 'Face Serum', 'Coffee Blend', 'Woven Basket', 'Knit Blanket', 'Soap Bar'];
  cities TEXT[]     := ARRAY['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'Austin'];
  sellers TEXT[]    := ARRAY['Earth & Co', 'Urban Artisan', 'The Minimalist Maker', 'Sunset Studios', 'Heritage Crafts', 'Nova Goods', 'Pine & Oak', 'Lumina Designs', 'Wandering Maker', 'Terra Cotta Collective'];
  reviewers TEXT[]  := ARRAY['Alex J.', 'Sam T.', 'Jamie L.', 'Chris P.', 'Taylor R.', 'Jordan M.', 'Casey S.', 'Morgan E.', 'Riley D.', 'Avery K.'];
  comments TEXT[]   := ARRAY[
    'Absolutely love this! The quality is amazing.',
    'Good product for the price. Would buy again.',
    'Shipped quickly and arrived in perfect condition.',
    'Beautiful craftsmanship. A wonderful addition to my home.',
    'Five stars! Exceeded all my expectations.',
    'Very unique piece. Everyone asks me about it.',
    'Stunning! The maker really paid attention to detail.',
    'Decent quality. Might order another one as a gift.'
  ];

  product_name TEXT;
  product_slug TEXT;
  product_id UUID;
  i INT;
  j INT;
  num_reviews INT;
  rating_val INT;
BEGIN
  FOR i IN 1..200 LOOP
    product_name := adjectives[1 + floor(random() * array_length(adjectives, 1))::INT]
                    || ' '
                    || nouns[1 + floor(random() * array_length(nouns, 1))::INT];

    product_slug := lower(regexp_replace(product_name, '[^a-zA-Z0-9]+', '-', 'g'))
                    || '-'
                    || substr(md5(random()::TEXT), 1, 6);

    INSERT INTO products (name, slug, price, seller, city, category, description, stock)
    VALUES (
      product_name,
      product_slug,
      (10 + floor(random() * 190))::INT,
      sellers[1 + floor(random() * array_length(sellers, 1))::INT],
      cities[1 + floor(random() * array_length(cities, 1))::INT],
      categories[1 + floor(random() * array_length(categories, 1))::INT],
      'This beautiful ' || lower(product_name) || ' is carefully crafted to bring joy and utility to your life.',
      (1 + floor(random() * 50))::INT
    )
    RETURNING id INTO product_id;

    -- Insert 1-5 reviews per product
    num_reviews := 1 + floor(random() * 5)::INT;
    FOR j IN 1..num_reviews LOOP
      IF random() > 0.8 THEN
        rating_val := 2 + floor(random() * 2)::INT;  -- 2-3 occasionally
      ELSE
        rating_val := 4 + floor(random() * 2)::INT;  -- mostly 4-5
      END IF;

      INSERT INTO reviews (product_id, user_name, rating, comment)
      VALUES (
        product_id,
        reviewers[1 + floor(random() * array_length(reviewers, 1))::INT],
        LEAST(5, GREATEST(1, rating_val)),
        CASE WHEN random() > 0.3 THEN comments[1 + floor(random() * array_length(comments, 1))::INT] ELSE NULL END
      );
    END LOOP;
  END LOOP;

  RAISE NOTICE 'Seeding complete!';
END $$;

-- Show row counts after seeding
SELECT 'products' AS table_name, COUNT(*) AS row_count FROM products
UNION ALL
SELECT 'reviews', COUNT(*) FROM reviews;
