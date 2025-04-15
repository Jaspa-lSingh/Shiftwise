import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiLogIn, FiUserPlus, FiMenu, FiX, FiAlertCircle } from 'react-icons/fi';

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
          >
            Shiftwise
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FiLogIn className="w-5 h-5" />
                <span className="font-medium">Login</span>
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100">
                  <Link
                    to="/login/employee"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FiUser className="mr-2 text-blue-600" />
                    Employee
                  </Link>
                  <Link
                    to="/login/admin"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FiUser className="mr-2 text-blue-600" />
                    Admin
                  </Link>
                </div>
              )}
            </div>

            {/* Restricted Sign Up Button */}
            <div 
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed relative group"
              title="Sign ups are currently disabled"
            >
              <FiUserPlus className="w-5 h-5" />
              <span className="font-medium">Sign Up</span>
              
              {/* Red Hover Overlay */}
              <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity"></div>
              
              {/* Restriction Tooltip */}
              <div className="absolute top-full mt-2 left-0 w-48 bg-red-50 text-red-600 px-3 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="flex items-center gap-2">
                  <FiAlertCircle className="flex-shrink-0" />
                  <span className="text-sm">Sign ups are currently disabled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute inset-x-0 top-16 bg-white border-t border-gray-100 shadow-lg animate-slideDown">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              to="/login/employee"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiUser className="mr-3 text-blue-600" />
              Employee Login
            </Link>
            <Link
              to="/login/admin"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiUser className="mr-3 text-blue-600" />
              Admin Login
            </Link>

            {/* Restricted Mobile Sign Up Button */}
            <div 
              className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed relative group"
              title="Sign ups are currently disabled"
            >
              <FiUserPlus className="mr-2" />
              <span>Sign Up</span>
              
              {/* Mobile Red Hover Effect */}
              <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity"></div>
              
              {/* Mobile Restriction Tooltip */}
              <div className="absolute top-full mt-2 left-4 right-4 bg-red-50 text-red-600 px-3 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="flex items-center gap-2">
                  <FiAlertCircle className="flex-shrink-0" />
                  <span className="text-sm">Sign ups are currently disabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;