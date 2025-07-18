'use client';

import { useWishlist } from '@/hooks/useWishlist';
import { useWishlistStore } from '@/store/wishlist';
import { useGamepad } from '@/hooks/useGamepad';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchPopularGames } from '@/lib/rawg';
import Link from 'next/link';
import { Filters } from '@/lib/types';

export default function GameGrid({ filters }: { filters: Filters }) {
    const router = useRouter();
    const [games, setGames] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const { add, remove, isWishlisted } = useWishlistStore();
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const data = await fetchPopularGames(); // or use fetchGames(filters)
            setGames(data);
            setLoading(false);
        };
        load();
    }, [filters]);

    useGamepad((buttonIndex) => {
        if (buttonIndex === 0) {
            // A button
            router.push(`/games/${games[selectedIndex].slug}`);
        } else if (buttonIndex === 1) {
            // B button
            console.log("Go back or close menu");
        } else if (buttonIndex === 12) {
            // Up
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
        } else if (buttonIndex === 13) {
            // Down
            setSelectedIndex((prev) => Math.min(prev + 1, games.length - 1));
        }
    });

    return (
        <section>
            {loading && <p className="text-white">Loading...</p>}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {games.map((game) => (
                    <div
                        key={game.id}
                        className="bg-[#162320] p-3 rounded-lg hover:scale-105 transition relative"
                    >
                        <Link href={`/games/${game.slug}`}>
                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="w-full h-36 object-cover rounded-md mb-3"
                            />
                            <h3 className="text-base font-medium text-white">{game.name}</h3>
                            <p className="text-xs text-green-400">
                                {game.genres.map((g: any) => g.name).join(', ')}
                            </p>
                        </Link>

                        <button
                            onClick={() =>
                                isWishlisted(game.id) ? remove(game.id) : add(game)
                            }
                            className={`absolute top-2 right-2 px-2 py-1 rounded text-sm ${isWishlisted(game.id)
                                    ? 'bg-red-600 text-white'
                                    : 'bg-green-600 text-white'
                                }`}
                        >
                            {isWishlisted(game.id) ? 'Remove' : 'Add to Wishlist'}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
