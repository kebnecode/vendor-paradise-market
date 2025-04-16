
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { products } from "@/lib/dummyData";

const Cart = () => {
  // In a real application, cart state would be managed globally
  // This is just a simple example using local state
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      productId: "product1",
      quantity: 1,
      price: products.find(p => p.id === "product1")?.discountPrice || 59.99,
      name: "Wireless Bluetooth Earbuds",
      image: "/placeholder.svg",
      vendorId: "vendor1"
    },
    {
      productId: "product4",
      quantity: 2,
      price: products.find(p => p.id === "product4")?.discountPrice || 129.99,
      name: "Designer Leather Handbag",
      image: "/placeholder.svg",
      vendorId: "vendor2"
    }
  ]);
  
  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const removeItem = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.productId !== productId));
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  const isCartEmpty = cartItems.length === 0;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          
          {isCartEmpty ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingCart className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-medium text-gray-700 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild>
                <Link to="/products">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="bg-white rounded-lg border shadow-sm p-6 mb-4">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">
                      Cart Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                    </h2>
                    <button
                      onClick={clearCart}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Clear Cart
                    </button>
                  </div>
                  
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.productId}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                      />
                    ))}
                  </div>
                </div>
                
                <Link
                  to="/products"
                  className="inline-flex items-center text-marketplace-purple hover:underline"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Continue Shopping
                </Link>
              </div>
              
              <div className="lg:w-96">
                <CartSummary items={cartItems} />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
