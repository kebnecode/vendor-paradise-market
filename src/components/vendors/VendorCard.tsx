
import { Link } from "react-router-dom";
import { Vendor } from "@/types";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard = ({ vendor }: VendorCardProps) => {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow transition-all hover:shadow-md">
      <div className="relative h-32 w-full overflow-hidden bg-gray-100">
        <img
          src={vendor.coverImage}
          alt={`${vendor.storeName} cover`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative px-4 pt-10 pb-4">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 rounded-full border-4 border-white overflow-hidden">
          <img
            src={vendor.logo}
            alt={vendor.storeName}
            className="h-16 w-16 object-cover"
          />
        </div>
        <div className="text-center">
          <h3 className="flex items-center justify-center text-lg font-semibold">
            {vendor.storeName}
            {vendor.verified && (
              <CheckCircle className="ml-1 h-4 w-4 text-blue-500" />
            )}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{vendor.location}</p>
          <div className="mt-2 flex items-center justify-center text-yellow-500">
            {"★".repeat(Math.floor(vendor.rating))}
            {"☆".repeat(5 - Math.floor(vendor.rating))}
            <span className="ml-1 text-xs text-gray-500">({vendor.rating.toFixed(1)})</span>
          </div>
          <p className="mt-3 line-clamp-2 text-sm text-gray-600">{vendor.description}</p>
          <Link to={`/vendors/${vendor.id}`}>
            <Button className="mt-4 w-full bg-marketplace-purple hover:bg-marketplace-purple-dark">
              Visit Store
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
