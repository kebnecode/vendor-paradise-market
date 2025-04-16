
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import { vendors, products } from "@/lib/dummyData";
import { Vendor, Product } from "@/types";
import { MapPin, Mail, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VendorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [vendorProducts, setVendorProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Find the vendor
    const foundVendor = vendors.find((v) => v.id === id);
    if (foundVendor) {
      setVendor(foundVendor);
      
      // Find the vendor's products
      const foundProducts = products.filter((p) => p.vendorId === id);
      setVendorProducts(foundProducts);
    }
  }, [id]);
  
  if (!vendor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Vendor not found</h2>
            <Link to="/vendors" className="text-marketplace-purple hover:underline mt-4 inline-block">
              Back to Vendors
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Vendor Cover Image */}
        <div className="h-64 bg-gray-200 relative">
          <img
            src={vendor.coverImage}
            alt={`${vendor.storeName} cover`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Vendor Info */}
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row -mt-20 mb-8">
            <div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden bg-white mx-auto md:mx-0">
              <img
                src={vendor.logo}
                alt={vendor.storeName}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mt-4 md:mt-16 md:ml-6 text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold flex items-center justify-center md:justify-start">
                    {vendor.storeName}
                    {vendor.verified && (
                      <CheckCircle className="ml-2 h-6 w-6 text-blue-500" />
                    )}
                  </h1>
                  <div className="flex items-center mt-2 justify-center md:justify-start">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(vendor.rating) ? "fill-current" : "fill-none"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      {vendor.rating.toFixed(1)} rating
                    </span>
                  </div>
                  <div className="flex items-center mt-2 text-gray-500 justify-center md:justify-start">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{vendor.location}</span>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <Button className="bg-marketplace-purple hover:bg-marketplace-purple-dark">
                    <Mail className="h-4 w-4 mr-2" /> Contact Seller
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <p className="text-gray-700">{vendor.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                Since {new Date(vendor.joinedDate).getFullYear()}
              </div>
              <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {vendorProducts.length} Products
              </div>
              {vendor.verified && (
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Verified Seller
                </div>
              )}
            </div>
          </div>
          
          {/* Vendor Content Tabs */}
          <Tabs defaultValue="products" className="mb-12">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="mt-6">
              {vendorProducts.length > 0 ? (
                <ProductGrid products={vendorProducts} />
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No products yet</h3>
                  <p className="text-gray-500">This vendor hasn't listed any products yet.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="about" className="mt-6">
              <div className="prose max-w-none">
                <h3>About {vendor.storeName}</h3>
                <p>
                  Founded in {new Date(vendor.joinedDate).getFullYear()}, {vendor.storeName} has been providing quality products to customers around the world.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, 
                  nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies 
                  nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, 
                  nisl nisl aliquam nisl.
                </p>
                <h3>Our Mission</h3>
                <p>
                  To provide our customers with the highest quality products at the most competitive prices.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="policies" className="mt-6">
              <div className="prose max-w-none">
                <h3>Shipping Policy</h3>
                <p>
                  We ship to all countries worldwide. Standard shipping takes 5-7 business days.
                  Express shipping options are available at checkout.
                </p>
                
                <h3>Return Policy</h3>
                <p>
                  We accept returns within 30 days of delivery. Items must be unused and in original packaging.
                  Please contact us before initiating a return.
                </p>
                
                <h3>Privacy Policy</h3>
                <p>
                  We respect your privacy and are committed to protecting your personal data.
                  We do not share your information with third parties without your consent.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VendorProfile;
