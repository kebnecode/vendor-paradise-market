
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import { products } from "@/lib/dummyData";
import { Product } from "@/types";
import { Star, Truck, ShieldCheck, ArrowLeft, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Fetch product data
  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);
  
  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Product not found</h2>
            <Link to="/products" className="text-marketplace-purple hover:underline mt-4 inline-block">
              Back to Products
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
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <Link to="/products" className="inline-flex items-center text-marketplace-purple hover:underline mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div>
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
                <img
                  src={product.images[activeImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-square bg-gray-100 rounded cursor-pointer border-2 ${
                      activeImageIndex === index
                        ? "border-marketplace-purple"
                        : "border-transparent"
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-current" : "fill-none"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating.toFixed(1)} ({product.reviews.length} reviews)
                </span>
              </div>
              
              <div className="mb-6">
                {product.discountPrice ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-gray-900">
                      ${product.discountPrice.toFixed(2)}
                    </span>
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="ml-2 bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-medium">
                      Save ${(product.price - product.discountPrice).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center">
                  <button
                    className="w-10 h-10 rounded-l border border-gray-300 flex items-center justify-center"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val > 0 && val <= product.stock) {
                        setQuantity(val);
                      }
                    }}
                    className="w-16 h-10 border-t border-b border-gray-300 text-center"
                  />
                  <button
                    className="w-10 h-10 rounded-r border border-gray-300 flex items-center justify-center"
                    onClick={() =>
                      quantity < product.stock && setQuantity(quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Stock Status */}
              <div className="mb-6">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.stock > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.stock > 0
                    ? `In Stock (${product.stock} available)`
                    : "Out of Stock"}
                </span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  className="flex-1 bg-marketplace-purple hover:bg-marketplace-purple-dark"
                  size="lg"
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5 mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" size="icon" className="hidden sm:flex">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Shipping & Returns */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Free Shipping</h4>
                    <p className="text-sm text-gray-500">Free standard shipping on all orders over $100</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">30-Day Returns</h4>
                    <p className="text-sm text-gray-500">Shop with confidence knowing you can return within 30 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                  auctor, nisl eget ultricies tincidunt, nisl nisl aliquam
                  nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl
                  eget ultricies tincidunt, nisl nisl aliquam nisl, eget
                  ultricies nisl nisl eget nisl.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <div className="border rounded-lg">
                <div className="grid grid-cols-2 border-b last:border-b-0">
                  <div className="p-3 bg-gray-50 font-medium">Category</div>
                  <div className="p-3">
                    {product.category}
                  </div>
                </div>
                <div className="grid grid-cols-2 border-b last:border-b-0">
                  <div className="p-3 bg-gray-50 font-medium">Brand</div>
                  <div className="p-3">Generic</div>
                </div>
                <div className="grid grid-cols-2 border-b last:border-b-0">
                  <div className="p-3 bg-gray-50 font-medium">Weight</div>
                  <div className="p-3">0.5 kg</div>
                </div>
                <div className="grid grid-cols-2 border-b last:border-b-0">
                  <div className="p-3 bg-gray-50 font-medium">Dimensions</div>
                  <div className="p-3">10 × 10 × 10 cm</div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              {product.reviews.length > 0 ? (
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                          <img
                            src={review.userAvatar || "/placeholder.svg"}
                            alt={review.userName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{review.userName}</h4>
                          <div className="flex items-center">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-current" : "fill-none"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No reviews yet</h3>
                  <p className="text-gray-500">Be the first to review this product</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <ProductGrid products={relatedProducts} />
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
