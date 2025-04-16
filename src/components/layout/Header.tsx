
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = false; // Replace with actual auth state later

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <div className="md:hidden mr-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg font-semibold">Home</Link>
                <Link to="/products" className="text-lg font-semibold">Products</Link>
                <Link to="/vendors" className="text-lg font-semibold">Vendors</Link>
                <Link to="/about" className="text-lg font-semibold">About</Link>
                <Link to="/contact" className="text-lg font-semibold">Contact</Link>
                {!isLoggedIn && (
                  <>
                    <Link to="/auth?type=login" className="text-lg font-semibold">Login</Link>
                    <Link to="/auth?type=register" className="text-lg font-semibold">Register</Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        <Link to="/" className="mr-4 flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-marketplace-purple to-marketplace-purple-light bg-clip-text text-transparent">
            Vendor Paradise
          </span>
        </Link>
        
        <div className="hidden md:flex md:space-x-4 md:ml-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link
            to="/products"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Products
          </Link>
          <Link
            to="/vendors"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Vendors
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </div>
        
        <div className="flex-1 flex justify-center px-2">
          <div className="w-full max-w-lg lg:max-w-xs relative">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input 
                placeholder="Search products..."
                className="pl-10 w-full"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Link to="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account/wishlist">Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/vendor/dashboard">Vendor Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex md:items-center md:space-x-2">
              <Link to="/auth?type=login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/auth?type=register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
