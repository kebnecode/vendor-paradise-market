
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VendorGrid from "@/components/vendors/VendorGrid";
import { vendors } from "@/lib/dummyData";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const Vendors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Explore Our Vendors</h1>
            <p className="text-gray-600 mb-6">
              Discover a diverse range of trusted vendors offering unique products. 
              Each seller is verified to ensure quality and reliability.
            </p>
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search vendors..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {filteredVendors.length > 0 ? (
            <VendorGrid vendors={filteredVendors} />
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-2">No vendors found</h3>
              <p className="text-gray-500">
                Try adjusting your search terms or browse all vendors.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-marketplace-purple hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Vendors;
