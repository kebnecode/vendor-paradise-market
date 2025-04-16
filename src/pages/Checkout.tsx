
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartItem } from "@/types";
import { products } from "@/lib/dummyData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CreditCard, Truck, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mocked cart items (would typically come from a cart state or context)
  const cartItems: CartItem[] = [
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
  ];
  
  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });
  
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 100 ? 0 : 10;
  const taxRate = 0.07;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + shippingCost + taxAmount;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Order placed successfully!",
        description: "Your order has been placed and is being processed.",
      });
      navigate("/order-success");
    }, 2000);
  };
  
  const isFormValid = () => {
    return (
      shippingInfo.fullName &&
      shippingInfo.email &&
      shippingInfo.phone &&
      shippingInfo.address &&
      shippingInfo.city &&
      shippingInfo.state &&
      shippingInfo.zipCode &&
      shippingInfo.country
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="text-sm breadcrumbs mb-6">
            <ul className="flex space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-marketplace-purple">
                  Home
                </Link>
              </li>
              <li className="before:content-['/'] before:mx-2 before:text-gray-400">
                <Link to="/cart" className="text-gray-500 hover:text-marketplace-purple">
                  Cart
                </Link>
              </li>
              <li className="before:content-['/'] before:mx-2 before:text-gray-400">
                <span className="text-marketplace-purple">Checkout</span>
              </li>
            </ul>
          </div>
          
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Checkout Form */}
            <div className="flex-1">
              <form onSubmit={handleSubmit}>
                {/* Shipping Information */}
                <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={shippingInfo.country}
                        onValueChange={(value) =>
                          setShippingInfo((prev) => ({ ...prev, country: value }))
                        }
                      >
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                          <SelectItem value="AU">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                  
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="credit_card" id="credit_card" />
                      <Label htmlFor="credit_card" className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="paystack" id="paystack" />
                      <Label htmlFor="paystack">Paystack</Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === "credit_card" && (
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="card_number">Card Number</Label>
                        <Input id="card_number" placeholder="0000 0000 0000 0000" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Checkout Button */}
                <div className="flex justify-between items-center">
                  <Link
                    to="/cart"
                    className="inline-flex items-center text-marketplace-purple hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to Cart
                  </Link>
                  
                  <Button
                    type="submit"
                    className="bg-marketplace-purple hover:bg-marketplace-purple-dark"
                    size="lg"
                    disabled={!isFormValid() || isProcessing}
                  >
                    {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-96">
              <div className="bg-white rounded-lg border shadow-sm p-6 sticky top-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex items-start">
                      <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-medium mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="text-sm font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Shipping</span>
                    <span className="text-sm font-medium">
                      {shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : "Free"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tax (7%)</span>
                    <span className="text-sm font-medium">${taxAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-2 mt-2 flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6 text-sm space-y-2">
                  <div className="flex items-start">
                    <Truck className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">
                      Estimated delivery: 5-7 business days
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">
                      Free returns within 30 days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
