
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      {product.discountPrice && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
          Sale
        </div>
      )}
      <button
        className="absolute top-2 right-2 z-10 rounded-full p-1.5 text-gray-500 bg-white/80 backdrop-blur-sm hover:text-red-500"
        aria-label="Add to wishlist"
      >
        <Heart className="h-4 w-4" />
      </button>
      <Link to={`/products/${product.id}`} className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 text-sm font-medium text-gray-700 line-clamp-1">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="mt-auto flex justify-between items-center">
          <div className="flex items-center">
            {product.discountPrice ? (
              <>
                <span className="text-sm font-medium text-gray-900">${product.discountPrice.toFixed(2)}</span>
                <span className="ml-2 text-xs text-gray-500 line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</span>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-sm text-yellow-500">★</span>
            <span className="text-xs text-gray-500">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <Button className="w-full mt-3 bg-marketplace-purple hover:bg-marketplace-purple-dark">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
