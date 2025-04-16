
import { Product, Vendor, User, Category } from "@/types";

// Sample Users
export const users: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    isVendor: true,
    avatar: "/placeholder.svg",
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    isVendor: true,
    avatar: "/placeholder.svg",
  },
  {
    id: "user3",
    name: "Alice Johnson",
    email: "alice@example.com",
    isVendor: false,
    avatar: "/placeholder.svg",
  },
];

// Sample Vendors
export const vendors: Vendor[] = [
  {
    id: "vendor1",
    userId: "user1",
    storeName: "Tech Haven",
    description: "Your one-stop shop for all tech gadgets and accessories.",
    logo: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    rating: 4.8,
    products: ["product1", "product2", "product3"],
    joinedDate: "2023-01-15",
    verified: true,
    location: "San Francisco, CA",
  },
  {
    id: "vendor2",
    userId: "user2",
    storeName: "Fashion Forward",
    description: "Trendy fashion items for the modern individual.",
    logo: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    rating: 4.5,
    products: ["product4", "product5"],
    joinedDate: "2023-02-20",
    verified: true,
    location: "New York, NY",
  },
];

// Sample Categories
export const categories: Category[] = [
  {
    id: "cat1",
    name: "Electronics",
    slug: "electronics",
    image: "/placeholder.svg",
  },
  {
    id: "cat2",
    name: "Fashion",
    slug: "fashion",
    image: "/placeholder.svg",
  },
  {
    id: "cat3",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    image: "/placeholder.svg",
  },
  {
    id: "cat4",
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    image: "/placeholder.svg",
  },
  {
    id: "cat5",
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    image: "/placeholder.svg",
  },
];

// Sample Products
export const products: Product[] = [
  {
    id: "product1",
    vendorId: "vendor1",
    name: "Wireless Bluetooth Earbuds",
    description: "High-quality wireless earbuds with noise cancellation and long battery life.",
    price: 79.99,
    discountPrice: 59.99,
    images: ["/placeholder.svg"],
    category: "cat1",
    tags: ["electronics", "audio", "wireless"],
    stock: 50,
    rating: 4.7,
    reviews: [
      {
        id: "review1",
        userId: "user3",
        userName: "Alice Johnson",
        userAvatar: "/placeholder.svg",
        rating: 5,
        comment: "Great sound quality and comfortable to wear!",
        createdAt: "2023-03-10",
      },
    ],
    createdAt: "2023-02-15",
    updatedAt: "2023-03-10",
    featured: true,
  },
  {
    id: "product2",
    vendorId: "vendor1",
    name: "Smart Watch Series 5",
    description: "Latest smartwatch with health tracking, GPS, and water resistance.",
    price: 199.99,
    discountPrice: 179.99,
    images: ["/placeholder.svg"],
    category: "cat1",
    tags: ["electronics", "wearable", "smart watch"],
    stock: 30,
    rating: 4.8,
    reviews: [],
    createdAt: "2023-01-20",
    updatedAt: "2023-02-05",
    featured: true,
  },
  {
    id: "product3",
    vendorId: "vendor1",
    name: "Ultra HD Smart TV 55\"",
    description: "4K Ultra HD Smart TV with built-in streaming services and voice control.",
    price: 599.99,
    images: ["/placeholder.svg"],
    category: "cat1",
    tags: ["electronics", "tv", "smart tv"],
    stock: 15,
    rating: 4.6,
    reviews: [],
    createdAt: "2023-02-20",
    updatedAt: "2023-02-20",
    featured: false,
  },
  {
    id: "product4",
    vendorId: "vendor2",
    name: "Designer Leather Handbag",
    description: "Elegant designer handbag made from genuine leather with multiple compartments.",
    price: 149.99,
    discountPrice: 129.99,
    images: ["/placeholder.svg"],
    category: "cat2",
    tags: ["fashion", "accessories", "handbag"],
    stock: 20,
    rating: 4.5,
    reviews: [],
    createdAt: "2023-03-01",
    updatedAt: "2023-03-05",
    featured: true,
  },
  {
    id: "product5",
    vendorId: "vendor2",
    name: "Men's Casual Dress Shirt",
    description: "Comfortable and stylish casual dress shirt for men, perfect for any occasion.",
    price: 49.99,
    images: ["/placeholder.svg"],
    category: "cat2",
    tags: ["fashion", "men", "shirt"],
    stock: 40,
    rating: 4.3,
    reviews: [],
    createdAt: "2023-03-05",
    updatedAt: "2023-03-05",
    featured: false,
  },
  {
    id: "product6",
    vendorId: "vendor2",
    name: "Premium Cotton T-Shirt",
    description: "High-quality cotton t-shirt available in multiple colors.",
    price: 24.99,
    images: ["/placeholder.svg"],
    category: "cat2",
    tags: ["fashion", "t-shirt", "casual"],
    stock: 100,
    rating: 4.4,
    reviews: [],
    createdAt: "2023-03-10",
    updatedAt: "2023-03-10",
    featured: false,
  },
];

// Featured products
export const featuredProducts = products.filter(product => product.featured);

// Featured vendors
export const featuredVendors = vendors;
