import React, { useState } from "react";
import { Search, Edit, Bell, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">h</span>
              </div>
              <a
                href="/"
                className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors"
              >
                <span className="ml-2 text-xl font-bold text-gray-900">
                  hashnode
                </span>
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="/auth/logout"
              className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              <button>Logout</button>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              Products
            </a>
            <a
              href="/posts/pending-blogs"
              className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              Pending Blogs
            </a>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>

            {/* Action Buttons */}
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Edit className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
            </button>

            {/* Profile */}
            <div className="relative">
              <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JK
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-600 p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              Community
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              Products
            </a>
            <a
              href="/posts/pending-blogs"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              Pending blogs
            </a>
          </div>

          {/* Mobile Search */}
          <div className="px-4 py-3 border-t border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="px-4 py-3 border-t border-gray-200 flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Edit className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm font-medium">
              JK
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
