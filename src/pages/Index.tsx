
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import VendorGrid from "@/components/vendors/VendorGrid";
import { Button } from "@/components/ui/button";
import { featuredProducts, featuredVendors, categories } from "@/lib/dummyData";
import { Category } from "@/types";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredProducts = selectedCategory
    ? featuredProducts.filter(product => product.category === selectedCategory)
    : featuredProducts;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-marketplace-purple/90 to-marketplace-purple-dark/90 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Unique Products from Verified Vendors
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Shop with confidence on our multi-vendor marketplace featuring quality products from trusted sellers.
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild size="lg" className="bg-white text-marketplace-purple hover:bg-gray-100">
                <Link to="/products">Browse Products</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/vendor/register">Become a Vendor</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category: Category) => (
                <div 
                  key={category.id}
                  className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                >
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <img src={category.image} alt={category.name} className="w-8 h-8" />
                  </div>
                  <h3 className="font-medium text-gray-800">{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Products Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                {selectedCategory 
                  ? `${categories.find(c => c.id === selectedCategory)?.name} Products` 
                  : "Featured Products"}
              </h2>
              <Link to="/products" className="text-marketplace-purple hover:underline">
                View All Products
              </Link>
            </div>
            <ProductGrid products={filteredProducts} />
          </div>
        </section>
        
        {/* Featured Vendors Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Top Vendors</h2>
              <Link to="/vendors" className="text-marketplace-purple hover:underline">
                View All Vendors
              </Link>
            </div>
            <VendorGrid vendors={featuredVendors} />
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-12 bg-marketplace-purple text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Selling?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join our marketplace and reach thousands of customers. Sign up today to start selling your products!
            </p>
            <Button asChild size="lg" className="bg-white text-marketplace-purple hover:bg-gray-100">
              <Link to="/vendor/register">Become a Vendor</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
