// js/data.js - Product Database

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2599,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    description: "High-quality wireless headphones with noise cancellation and long battery life."
  },
  {
    id: 2,
    name: "Laptop 15 inch",
    category: "Electronics",
    price: 45999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    description: "Powerful laptop with latest processor, 16GB RAM, and 512GB SSD storage."
  },
  {
    id: 3,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 899,
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    description: "Ergonomic wireless mouse with precision tracking and comfortable grip."
  },
  {
    id: 4,
    name: "Smartphone Pro",
    category: "Electronics",
    price: 32999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    description: "Latest smartphone with advanced camera system and 5G connectivity."
  },
  {
    id: 5,
    name: "Power Bank 20000mAh",
    category: "Electronics",
    price: 1899,
    rating: 3.9,
    image: "https://coolnutindia.com/wp-content/uploads/2024/04/Amazon_creative_1.jpg",
    description: "High capacity power bank with fast charging for multiple devices."
  },
  {
    id: 6,
    name: "Leather Jacket",
    category: "Fashion",
    price: 4999,
    rating: 4.7,
    image: "https://media.istockphoto.com/id/505623612/photo/leather-jacket.jpg?s=612x612&w=0&k=20&c=3kqezwMgO8IXB6j1ofeqWG5jEbwueutWCPj8qGXVR3E=",
    description: "Premium leather jacket with stylish design and perfect fit."
  },
  {
    id: 7,
    name: "Denim Jeans",
    category: "Fashion",
    price: 1299,
    rating: 3.7,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    description: "Classic denim jeans with perfect fit and premium quality fabric."
  },
  {
    id: 8,
    name: "Canvas Sneakers",
    category: "Fashion",
    price: 1199,
    rating: 4.1,
    image: "https://assets.ajio.com/medias/sys_master/root/20241002/Ae3a/66fc4fedf9b8ef490b8bff1d/-1117Wx1400H-700524197-blue-MODEL.jpg",
    description: "Comfortable canvas sneakers perfect for casual everyday wear."
  },
  {
    id: 9,
    name: "Casual T-Shirt",
    category: "Fashion",
    price: 599,
    rating: 3.6,
    image: "https://supervek.in/cdn/shop/files/1_3b04cd2f-c4c9-4b28-9fb4-3fdf7fe3dbb0.jpg?v=1712829551&width=1200",
    description: "Comfortable cotton t-shirt perfect for everyday wear."
  },
  {
    id: 10,
    name: "Designer Handbag",
    category: "Fashion",
    price: 3499,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
    description: "Elegant designer handbag with spacious compartments and premium finish."
  },
  {
    id: 11,
    name: "Coffee Table",
    category: "Home & Living",
    price: 3499,
    rating: 4.3,
    image: "https://m.media-amazon.com/images/I/81cKk+680cL._AC_UF894,1000_QL80_.jpg",
    description: "Modern coffee table with elegant design and sturdy construction."
  },
  {
    id: 12,
    name: "Table Lamp",
    category: "Home & Living",
    price: 1299,
    rating: 3.9,
    image: "https://m.media-amazon.com/images/I/71D2YNJoNNL._AC_UF1000,1000_QL80_.jpg",
    description: "Elegant table lamp with warm lighting and adjustable brightness."
  },
  {
    id: 13,
    name: "Throw Pillow",
    category: "Home & Living",
    price: 499,
    rating: 3.1,
    image: "https://m.media-amazon.com/images/I/91tNEYdF9nL.jpg",
    description: "Soft and comfortable throw pillow with beautiful design."
  },
  {
    id: 14,
    name: "Wall Art Canvas",
    category: "Home & Living",
    price: 1899,
    rating: 4.4,
    image: "https://khirki.in/cdn/shop/files/Artboard4_8b4d46cf-f62e-4401-a625-931e86ff3d49.jpg?v=1730449732",
    description: "Beautiful wall art canvas to enhance your home decor."
  },
  {
    id: 15,
    name: "Aroma Diffuser",
    category: "Home & Living",
    price: 1499,
    rating: 4.5,
    image: "https://5.imimg.com/data5/SELLER/Default/2023/1/FO/IG/HL/85700111/redolance-electric-aroma-oil-diffuser-humidifier-400ml.jpg",
    description: "Ultrasonic aroma diffuser with LED lights for relaxation."
  },
  {
    id: 16,
    name: "Sunglasses",
    category: "Accessories",
    price: 1299,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
    description: "Stylish sunglasses with UV protection and durable frame."
  },
  {
    id: 17,
    name: "Water Bottle",
    category: "Accessories",
    price: 399,
    rating: 3.6,
    image: "https://modernquests.com/cdn/shop/files/EllipseWaterBottle500ml-NordicSage6.jpg?v=1745235925&width=2048",
    description: "Insulated water bottle that keeps drinks cold for 24 hours."
  },
  {
    id: 18,
    name: "Backpack",
    category: "Accessories",
    price: 1599,
    rating: 4.5,
    image: "https://www.dealsmagnet.com/images/safari-medium-30-l-laptop-backpack-ashper-cb-o-18Ltzkb2.jpg",
    description: "Spacious backpack with multiple compartments and padded straps."
  },
  {
    id: 19,
    name: "Leather Wallet",
    category: "Accessories",
    price: 1299,
    rating: 4.5,
    image: "https://www.theblackcanvas.in/cdn/shop/files/honey-tan-classic-bifold-coin-pocket-wallet.jpg?v=1730911868",
    description: "Premium leather wallet with RFID protection."
  },
  {
    id: 20,
    name: "Reading Glasses",
    category: "Accessories",
    price: 399,
    rating: 3.7,
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400",
    description: "Anti-glare reading glasses with stylish frame."
  }
];
