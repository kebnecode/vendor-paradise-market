
import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2, Filter } from "lucide-react";
import { products } from "@/lib/dummyData";

const VendorProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Products</h1>
            <Button asChild className="bg-marketplace-purple hover:bg-marketplace-purple-dark">
              <Link to="/vendor/products/add">
                <Plus className="h-4 w-4 mr-2" /> Add New Product
              </Link>
            </Button>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <CardTitle>Your Products</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      className="pl-8 w-full md:w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="px-4 py-3 text-left">Product</th>
                      <th className="px-4 py-3 text-center">Price</th>
                      <th className="px-4 py-3 text-center">Stock</th>
                      <th className="px-4 py-3 text-center">Status</th>
                      <th className="px-4 py-3 text-center">Sales</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded overflow-hidden bg-gray-100 mr-3">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-xs text-gray-500">ID: {product.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-medium">${product.price.toFixed(2)}</div>
                          {product.discountPrice && (
                            <div className="text-xs text-gray-500 line-through">
                              ${product.price.toFixed(2)}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span
                            className={`font-medium ${
                              product.stock < 10
                                ? "text-red-600"
                                : product.stock < 50
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              product.stock > 0
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.stock > 0 ? "Active" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          {Math.floor(Math.random() * 50)}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorProducts;
