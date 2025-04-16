
import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { categories } from "@/lib/dummyData";
import { ArrowLeft, Upload, X, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const VendorAddProduct = () => {
  const { toast } = useToast();
  
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    stock: "",
    tags: "",
    featured: false,
  });
  
  const [images, setImages] = useState<string[]>(["/placeholder.svg"]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product data:", productData);
    console.log("Images:", images);
    
    toast({
      title: "Product created",
      description: "Your product has been successfully created.",
    });
  };
  
  const handleImageUpload = () => {
    // In a real app, this would open a file picker
    // Here we'll just simulate adding another placeholder
    if (images.length < 5) {
      setImages([...images, "/placeholder.svg"]);
    }
  };
  
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <Link to="/vendor/products" className="mr-4 text-marketplace-purple hover:underline flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
            </Link>
            <h1 className="text-2xl font-bold">Add New Product</h1>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Product Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        placeholder="Enter product description"
                        rows={5}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={productData.category}
                          onValueChange={(value) => setProductData({ ...productData, category: value })}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                          id="tags"
                          name="tags"
                          value={productData.tags}
                          onChange={handleInputChange}
                          placeholder="e.g. electronics, wireless, headphones"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing & Inventory</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Regular Price ($)</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          min="0"
                          step="0.01"
                          value={productData.price}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="discountPrice">Sale Price ($)</Label>
                        <Input
                          id="discountPrice"
                          name="discountPrice"
                          type="number"
                          min="0"
                          step="0.01"
                          value={productData.discountPrice}
                          onChange={handleInputChange}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input
                        id="stock"
                        name="stock"
                        type="number"
                        min="0"
                        value={productData.stock}
                        onChange={handleInputChange}
                        placeholder="Enter stock quantity"
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={productData.featured}
                        onCheckedChange={(checked) => setProductData({ ...productData, featured: checked })}
                      />
                      <Label htmlFor="featured">Feature this product on homepage</Label>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Product Images */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative aspect-square border rounded-md">
                            <img
                              src={image}
                              alt={`Product image ${index + 1}`}
                              className="w-full h-full object-cover rounded-md"
                            />
                            <button
                              type="button"
                              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        
                        {images.length < 5 && (
                          <button
                            type="button"
                            onClick={handleImageUpload}
                            className="border-2 border-dashed rounded-md flex flex-col items-center justify-center aspect-square text-gray-500 hover:text-marketplace-purple hover:border-marketplace-purple transition-colors"
                          >
                            <Upload className="h-8 w-8 mb-2" />
                            <span className="text-sm font-medium">Upload Image</span>
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        You can upload up to 5 images. The first image will be used as the product thumbnail.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex flex-col space-y-2">
                  <Button
                    type="submit"
                    className="bg-marketplace-purple hover:bg-marketplace-purple-dark"
                  >
                    Create Product
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link to="/vendor/products">Cancel</Link>
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorAddProduct;
