import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

function FooterComponent() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black dark:from-gray-800 dark:to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              PiLab
            </h2>
            <p className="text-gray-300 max-w-xs">
              Empowering innovation through cutting-edge technology solutions
              and research.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <nav>
              <ul className="space-y-2">
                {["Home", "About", "Services", "Projects", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-purple-400" />
                <span className="text-gray-300">info@pilab.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-purple-400" />
                <span className="text-gray-300">+88 01756404302</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-purple-400" />
                <span className="text-gray-300">DSC,Dhaka,Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} PiLab. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="/sitemap"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
