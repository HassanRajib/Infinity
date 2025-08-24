import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoAirplane } from "react-icons/io5";

export default function FooTer() {
  return (
    <footer className="text-black pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <IoAirplane className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold">Infinity Pathwayz</span>
            </div>
            <p className="text-black">
              Building innovative solutions for the modern world.
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a
                href="#"
                className="text-black hover:text-gray-400 transition"
                aria-label="Facebook"
              >
                <FaFacebook className="h-6 w-6" />
              </a>
              {/* Twitter */}
              <a
                href="#"
                className="text-black hover:text-gray-400 transition"
                aria-label="Twitter"
              >
                <FaTwitter className="h-6 w-6" />
              </a>
              {/* Instagram */}
              <a
                href="#"
                className="text-black hover:text-gray-400 transition"
                aria-label="Instagram"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                className="text-black hover:text-gray-400 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-black hover:text-gray-400 transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-gray-400 transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-gray-400 transition"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-gray-400 transition"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-gray-400 transition"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-black hover:text-gray-400 transition"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-gray-400 transition"
                >
                  Mobile Apps
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-gray-400 transition"
                >
                  UI/UX Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-gray-400 transition"
                >
                  Digital Marketing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-gray-400 transition"
                >
                  Cloud Solutions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <address className="not-italic text-black">
              <p>Colibri, Apt.# A-4, House# 60, Road# 8,</p>
              <p>Block# C, Banani, Dhaka-1213.</p>
              <p className="mt-2">
                Email:{" "} 
                <a
                  href="mailto:info@company.com"
                  className="hover:text-gray-400 transition"
                >
                  info@company.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+8801332527541"
                  className="hover:text-gray-400 transition"
                >
                  +880133 2527541
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 VLC. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
