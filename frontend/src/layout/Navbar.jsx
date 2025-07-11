import React, { useEffect, useState } from "react";
import { Search, Edit, Menu, X, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const { isLoggedIn, logout,profile } = useAuthStore();

  useEffect(() => {
    profile();
  }, [profile]);

  console.log("Isloggedin: ", isLoggedIn);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsAvatarOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsAvatarOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">h</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">
              hashnode
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/posts/pending-blogs"
              className="text-gray-700 hover:text-blue-600 text-sm font-medium"
            >
              Pending Blogs
            </Link>
            <Link
              to="/posts/create-blog"
              className="text-gray-700 hover:text-blue-600 text-sm font-medium"
            >
              Create Blog
            </Link>
            
          </div>
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
          {/* Desktop Right */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/auth/login"
                  className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/auth/signup"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              
              <div className="relative">
                <button
                  onClick={() => setIsAvatarOpen((prev) => !prev)}
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white font-medium"
                >
                  JK
                </button>
                {isAvatarOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-1" /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center">
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
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/posts/pending-blogs"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md"
            >
              Pending Blogs
            </Link>
          </div>
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
          <div className="px-4 pt-3 pb-4 border-t border-gray-200">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/auth/login"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/auth/signup"
                  className="block mt-1 px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-center"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50 rounded-md"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
