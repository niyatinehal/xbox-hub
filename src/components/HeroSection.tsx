'use client';

import { useEffect, useState } from "react";
import { fetchFeaturedGames } from "@/lib/rawg";
import Link from "next/link";

export default function HeroSection() {
    const [games, setGames] = useState<any[]>([]);

    useEffect(() => {
        fetchFeaturedGames().then(setGames);
    }, []);

    return (
        <section className="mb-10">
            <h2 className="text-2xl font-semibold text-green-400 mb-4">🔥 Featured Games</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {games.map((game) => (
                    <Link key={game.id} href={`/game/${game.slug}`}>
                        <div className="bg-[#1c2e2b] rounded-lg overflow-hidden hover:scale-105 transition">
                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-3">
                                <h3 className="text-lg font-semibold">{game.name}</h3>
                                <p className="text-sm text-green-300">
                                    {game.genres.map((g: any) => g.name).join(", ")}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
