
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Package, 
  ShoppingBag, 
  Users, 
  BarChart2, 
  Settings, 
  HelpCircle, 
  LogOut,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar = ({ collapsed = false }: SidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/vendor/dashboard",
    },
    {
      title: "Products",
      icon: Package,
      path: "/vendor/products",
    },
    {
      title: "Orders",
      icon: ShoppingBag,
      path: "/vendor/orders",
    },
    {
      title: "Customers",
      icon: Users,
      path: "/vendor/customers",
    },
    {
      title: "Analytics",
      icon: BarChart2,
      path: "/vendor/analytics",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/vendor/settings",
    },
    {
      title: "Help",
      icon: HelpCircle,
      path: "/vendor/help",
    },
  ];
  
  return (
    <div className={cn(
      "flex flex-col h-full bg-marketplace-dark text-white border-r",
      collapsed ? "w-16" : "w-64",
    )}>
      <div className="p-4 flex items-center justify-center border-b border-gray-700">
        {collapsed ? (
          <span className="text-xl font-bold text-marketplace-purple-light">VP</span>
        ) : (
          <span className="text-xl font-bold text-marketplace-purple-light">Vendor Portal</span>
        )}
      </div>
      
      <div className="p-4">
        <Button 
          className="w-full bg-marketplace-purple hover:bg-marketplace-purple-dark"
          size={collapsed ? "icon" : "default"}
          asChild
        >
          <Link to="/vendor/products/add">
            {collapsed ? (
              <Plus className="h-4 w-4" />
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" /> Add New Product
              </>
            )}
          </Link>
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center py-2 px-3 rounded-md transition-colors",
                isActive(item.path)
                  ? "bg-marketplace-purple-dark text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="ml-3">{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <button className={cn(
          "flex items-center text-gray-300 hover:text-white py-2 px-3 rounded-md transition-colors w-full hover:bg-gray-800",
        )}>
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
