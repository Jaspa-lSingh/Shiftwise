import React from 'react';
import { FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 w-full">
      {/* Social & Contact Section */}
      <div className="bg-gray-100 py-4 w-full">
        <div className="container mx-auto flex justify-center space-x-6 items-center">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            <FaFacebookF size={24} />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            <FaInstagram size={24} />
          </a>

          {/* Email Contact */}
          <a
            href="mailto:shiftwise00@gmail.com"
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <FaEnvelope size={24} />
            <span className="text-sm font-medium">Contact Us</span>
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-200 py-2 w-full">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-700">
            © {new Date().getFullYear()} Shiftwise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;