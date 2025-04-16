
export interface User {
  id: string;
  name: string;
  email: string;
  isVendor: boolean;
  avatar?: string;
}

export interface Vendor {
  id: string;
  userId: string;
  storeName: string;
  description: string;
  logo?: string;
  coverImage?: string;
  rating: number;
  products: string[]; // Array of product IDs
  joinedDate: string;
  verified: boolean;
  location?: string;
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  stock: number;
  rating: number;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  featured: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
  vendorId: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  parentId?: string;
}
