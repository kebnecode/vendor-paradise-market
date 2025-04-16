
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import { products, categories } from "@/lib/dummyData";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 600]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Filter products
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by price
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, priceRange, selectedCategories]);
  
  // Handle price range change
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };
  
  // Handle category selection
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    }
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 600]);
    setSelectedCategories([]);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">All Products</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-marketplace-purple hover:underline flex items-center"
                  >
                    <X className="h-3 w-3 mr-1" /> Clear all
                  </button>
                </div>
                
                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <Slider
                    value={priceRange}
                    min={0}
                    max={600}
                    step={10}
                    onValueChange={handlePriceRangeChange}
                    className="my-6"
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">${priceRange[0]}</span>
                    <span className="text-sm text-gray-500">${priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium mb-2">Categories</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={(checked) =>
                            handleCategoryChange(category.id, checked === true)
                          }
                        />
                        <label
                          htmlFor={`category-${category.id}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters or search term.</p>
                  <Button onClick={handleClearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
