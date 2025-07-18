'use client';

import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#0c1f1c] text-green-300 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-6 text-sm flex flex-col items-center space-y-6">
                {/* Top Links */}
                <div className="flex flex-wrap justify-center gap-8">
                    <a href="#" className="hover:underline">About Us</a>
                    <a href="#" className="hover:underline">Contact</a>
                    <a href="#" className="hover:underline">FAQ</a>
                    <a href="#" className="hover:underline">Privacy Policy</a>
                </div>

                {/* Social Icons */}
                <div className="flex gap-4 text-xl text-green-400">
                    <a href="#" className="hover:text-white"><FaTwitter /></a>
                    <a href="#" className="hover:text-white"><FaFacebookF /></a>
                    <a href="#" className="hover:text-white"><FaInstagram /></a>
                </div>

                {/* Copyright */}
                <div className="text-xs text-center text-green-400">
                    © 2024 GameHub. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
