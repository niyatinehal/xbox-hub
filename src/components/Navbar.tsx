'use client';

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full px-6 py-4 flex justify-between items-center bg-[#0c1f1c] shadow-md">
            <div className="flex items-center gap-6 text-white font-medium">
                <Link href="/" className="text-lg font-bold">🎮 GameHub</Link>
                <Link href="/">Home</Link>
                {/* <Link href="/browse">Browse</Link> */}
                <Link href="/favorites">My Games</Link>
                {/* <Link href="/wishlist">Wishlist</Link> */}
                <Link href="/ai">AI</Link>
            </div>

            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-[#1c2e2b] px-3 py-2 rounded-md text-sm text-white focus:outline-none"
                />
                <div className="w-8 h-8 rounded-full bg-white" />
            </div>
        </nav>
    );
}
