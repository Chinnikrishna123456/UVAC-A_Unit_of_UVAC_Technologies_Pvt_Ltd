import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const Footer = () => {
  useScrollToTop();

  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-2">UVAC Co-Working space</h3>
            <p className="text-sm text-neutral-400 mb-4">A unit by UVAC technologies private limited</p>
            <p className="text-neutral-300 mb-4">
              Professional workspace solutions tailored to your business needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/office-space" className="text-neutral-300 hover:text-white transition">
                  Office Space
                </Link>
              </li>
              <li>
                <Link href="/services/coworking" className="text-neutral-300 hover:text-white transition">
                  Coworking
                </Link>
              </li>
              <li>
                <Link href="/services/virtual-offices" className="text-neutral-300 hover:text-white transition">
                  Virtual Offices
                </Link>
              </li>
              <li>
                <Link href="/services/meeting-rooms" className="text-neutral-300 hover:text-white transition">
                  Meeting Rooms
                </Link>
              </li>
              <li>
                <Link href="/services/membership" className="text-neutral-300 hover:text-white transition">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/services/business-address" className="text-neutral-300 hover:text-white transition">
                  Business Address
                </Link>
              </li>
              <li>
                <Link href="/services/dedicated-desk" className="text-neutral-300 hover:text-white transition">
                  Dedicated Desk
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-neutral-300 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition">
                  Locations
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition">
                  Blog
                </a>
              </li>
             
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-neutral-300 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-700 text-center text-neutral-400 text-sm">
          <p>&copy; {new Date().getFullYear()} UVAC workplace. Workplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
