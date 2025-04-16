
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-marketplace-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-marketplace-purple-light">Vendor Paradise</h3>
            <p className="text-gray-300 mb-4">
              A premier multi-vendor marketplace connecting quality products with happy customers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-marketplace-purple-light">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-marketplace-purple-light">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-marketplace-purple-light">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-marketplace-purple-light">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-marketplace-purple-light">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-marketplace-purple-light">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-marketplace-purple-light">Products</Link>
              </li>
              <li>
                <Link to="/vendors" className="text-gray-300 hover:text-marketplace-purple-light">Vendors</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-marketplace-purple-light">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-marketplace-purple-light">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Vendor Information */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-marketplace-purple-light">For Vendors</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/vendor/register" className="text-gray-300 hover:text-marketplace-purple-light">Become a Vendor</Link>
              </li>
              <li>
                <Link to="/vendor/login" className="text-gray-300 hover:text-marketplace-purple-light">Vendor Login</Link>
              </li>
              <li>
                <Link to="/vendor/terms" className="text-gray-300 hover:text-marketplace-purple-light">Seller Terms</Link>
              </li>
              <li>
                <Link to="/vendor/fees" className="text-gray-300 hover:text-marketplace-purple-light">Seller Fees</Link>
              </li>
              <li>
                <Link to="/vendor/faq" className="text-gray-300 hover:text-marketplace-purple-light">Seller FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-marketplace-purple-light">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-marketplace-purple-light flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">123 Market Street, San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-marketplace-purple-light flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-marketplace-purple-light flex-shrink-0" />
                <span className="text-gray-300">support@vendorparadise.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Vendor Paradise. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 text-sm hover:text-marketplace-purple-light">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 text-sm hover:text-marketplace-purple-light">
                Terms of Service
              </Link>
              <Link to="/refund" className="text-gray-400 text-sm hover:text-marketplace-purple-light">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
