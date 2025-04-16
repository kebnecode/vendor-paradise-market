
import { useState } from "react";
import { Link } from "react-router-dom";
import { CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CartSummaryProps {
  items: CartItem[];
}

const CartSummary = ({ items }: CartSummaryProps) => {
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  
  // Calculate totals
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingEstimate = subtotal > 100 ? 0 : 10;
  const taxEstimate = subtotal * 0.07; // 7% tax rate
  const discount = couponApplied ? subtotal * 0.1 : 0; // 10% discount if coupon applied
  const total = subtotal + shippingEstimate + taxEstimate - discount;
  
  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "discount10") {
      setCouponApplied(true);
    }
  };
  
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Subtotal</span>
          <span className="text-sm font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Shipping estimate</span>
          <span className="text-sm font-medium">
            {shippingEstimate > 0 ? `$${shippingEstimate.toFixed(2)}` : "Free"}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Tax estimate</span>
          <span className="text-sm font-medium">${taxEstimate.toFixed(2)}</span>
        </div>
        
        {couponApplied && (
          <div className="flex justify-between text-green-600">
            <span className="text-sm">Discount (10%)</span>
            <span className="text-sm font-medium">-${discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="border-t pt-4 flex justify-between">
          <span className="text-base font-medium">Order total</span>
          <span className="text-base font-bold">${total.toFixed(2)}</span>
        </div>
      </div>
      
      <Accordion type="single" collapsible className="mt-4">
        <AccordionItem value="coupon">
          <AccordionTrigger className="text-sm">Apply Coupon Code</AccordionTrigger>
          <AccordionContent>
            <div className="flex space-x-2 mt-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button 
                onClick={handleApplyCoupon} 
                variant="outline" 
                size="sm"
                disabled={couponApplied}
              >
                Apply
              </Button>
            </div>
            {couponApplied && (
              <p className="text-xs text-green-600 mt-1">Coupon code applied successfully!</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Button 
        className="w-full mt-6 bg-marketplace-purple hover:bg-marketplace-purple-dark" 
        size="lg"
        asChild
      >
        <Link to="/checkout">
          Proceed to Checkout
        </Link>
      </Button>
      
      <div className="mt-4 text-center">
        <Link 
          to="/products" 
          className="text-sm text-marketplace-purple hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
      
      <div className="mt-6 border-t pt-4">
        <h3 className="text-sm font-medium mb-2">We accept</h3>
        <div className="flex space-x-2">
          <div className="bg-gray-200 rounded px-2 py-1 text-xs">Visa</div>
          <div className="bg-gray-200 rounded px-2 py-1 text-xs">Mastercard</div>
          <div className="bg-gray-200 rounded px-2 py-1 text-xs">PayPal</div>
          <div className="bg-gray-200 rounded px-2 py-1 text-xs">Paystack</div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
