TRUNCATE TABLE cart_items, carts, order_items, orders, products, faqs RESTART IDENTITY CASCADE;

INSERT INTO products (name, description, price, size, inventory, image_url, source_attribution, source_url, license)
VALUES
  ('Great White Shark', 'Ocean royalty with a bold, sleek silhouette.', 1200.00, 'Large', 5, '/assets/images/Great-White-Shark.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Blue Marlin', 'Fast, proud, and built for open waters.', 900.00, 'Large', 8, '/assets/images/Blue-Marlin.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Coelacanth', 'A living fossil with timeless charm.', 1500.00, 'Large', 3, '/assets/images/Coelacanth.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Tuna', 'Hefty and hearty, a classic catch.', 700.00, 'Large', 10, '/assets/images/Tuna.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Hammerhead Shark', 'Distinctive, curious, and unmistakable.', 1100.00, 'Large', 4, '/assets/images/Hammerhead-Shark.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Whale Shark', 'Gentle giant with a starry pattern.', 1400.00, 'Large', 2, '/assets/images/Whale_Shark.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Mahi-Mahi', 'Bright, bold, and bursting with color.', 800.00, 'Medium', 7, '/assets/images/Mahimahi.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Oarfish', 'Ribbon-like and rare from the deep.', 950.00, 'Large', 6, '/assets/images/oarfish.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Barreleye', 'Glassy-eyed wonder from the abyss.', 650.00, 'Small', 12, '/assets/images/barreleye.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Sea Bass', 'Reliable, everyday catch with a classic taste.', 120.00, 'Medium', 25, '/assets/images/sea-bass.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Clown Fish', 'Tiny, playful, and splashy in orange.', 180.00, 'Small', 18, '/assets/images/Clownfish.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Goldfish', 'Simple, serene, and pond-perfect.', 220.00, 'Small', 20, '/assets/images/Goldfish.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Pop-eyed Goldfish', 'Charming bulging eyes and a gentle glow.', 260.00, 'Small', 15, '/assets/images/Pop_eyed_goldfish.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Butterfly Fish', 'Delicate fins and tropical flair.', 300.00, 'Small', 16, '/assets/images/butterfly-fish.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Sea Horse', 'Tiny, twirling, and full of whimsy.', 240.00, 'Small', 14, '/assets/images/sea-horse.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Puffer Fish', 'Round, quirky, and a little dramatic.', 420.00, 'Medium', 11, '/assets/images/puffer_fish.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Anchovy', 'Small schooler with big flavor.', 90.00, 'Small', 30, '/assets/images/Anchovy.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Dorado', 'Golden shimmer with powerful presence.', 880.00, 'Large', 5, '/assets/images/Dorado.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Arowana', 'Regal swimmer with a metallic sheen.', 760.00, 'Large', 6, '/assets/images/Arowana.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license'),
  ('Stringfish', 'Cold-water legend with a long profile.', 1000.00, 'Large', 4, '/assets/images/Stringfish.webp', 'Animal Crossing Fandom', 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', 'Check source license');

INSERT INTO faqs (question, answer)
VALUES
  ('Is this a real store?', 'No. This is a practice project and demo storefront.'),
  ('Are payments real?', 'Payments are mocked for learning purposes.'),
  ('Where do product descriptions come from?', 'Descriptions and images are sourced from the Animal Crossing Fandom wiki with required attribution and licensing checks.'),
  ('Can I actually order fish?', 'Orders are demo-only and not fulfilled.');
