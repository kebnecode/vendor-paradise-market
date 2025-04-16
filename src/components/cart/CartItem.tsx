
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      onUpdateQuantity(item.productId, newQuantity);
    }
  };

  const handleRemove = () => {
    onRemove(item.productId);
  };

  const itemTotal = item.price * quantity;

  return (
    <div className="flex flex-col sm:flex-row border-b py-4 last:border-0">
      <div className="flex-shrink-0 h-24 w-24 sm:w-32 sm:h-32 bg-gray-100 rounded-md overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="flex flex-1 flex-col sm:flex-row sm:justify-between sm:ml-4 mt-4 sm:mt-0">
        <div className="flex flex-col">
          <Link 
            to={`/products/${item.productId}`}
            className="text-lg font-medium text-gray-900 hover:text-marketplace-purple"
          >
            {item.name}
          </Link>
          <Link 
            to={`/vendors/${item.vendorId}`}
            className="text-sm text-gray-500 hover:text-marketplace-purple"
          >
            Sold by: Vendor ID {item.vendorId}
          </Link>
          <p className="mt-1 text-sm text-gray-900">${item.price.toFixed(2)}</p>
        </div>
        
        <div className="flex items-center justify-between mt-4 sm:mt-0">
          <div className="flex items-center border rounded w-24">
            <button
              className="px-2 py-1 text-gray-600 hover:text-marketplace-purple disabled:opacity-50"
              onClick={() => quantity > 1 && onUpdateQuantity(item.productId, quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-10 text-center border-0 focus:ring-0 p-0"
            />
            <button
              className="px-2 py-1 text-gray-600 hover:text-marketplace-purple"
              onClick={() => onUpdateQuantity(item.productId, quantity + 1)}
            >
              +
            </button>
          </div>
          
          <div className="flex items-center ml-4">
            <p className="text-sm font-medium text-gray-900 sm:w-32 text-right">
              ${itemTotal.toFixed(2)}
            </p>
            <button
              onClick={handleRemove}
              className="ml-4 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
