
import { Vendor } from "@/types";
import VendorCard from "./VendorCard";

interface VendorGridProps {
  vendors: Vendor[];
  title?: string;
}

const VendorGrid = ({ vendors, title }: VendorGridProps) => {
  return (
    <div className="w-full">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
};

export default VendorGrid;
