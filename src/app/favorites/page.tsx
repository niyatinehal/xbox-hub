'use client';
import { useWishlistStore } from '@/store/wishlist';
import Link from 'next/link';

export default function FavouritesPage() {
    const { wishlist, remove } = useWishlistStore();

    return (
        <div className="min-h-screen bg-[#0f1a17] p-6 text-white">
            <h1 className="text-2xl font-bold mb-6 text-green-400">💚 Your Favourites</h1>

            {wishlist.length === 0 ? (
                <p className="text-gray-400">No games in your wishlist yet.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {wishlist.map((game) => (
                        <div key={game.id} className="bg-[#162320] p-3 rounded-lg hover:scale-105 transition">
                            <Link href={`/games/${game.slug}`}>
                                <img src={game.background_image} alt={game.name} className="w-full h-36 object-cover rounded-md mb-3" />
                                <h3 className="text-base font-medium text-white">{game.name}</h3>
                                <p className="text-xs text-green-400">{game.genres.map((g) => g.name).join(', ')}</p>
                            </Link>

                            <button
                                onClick={() => remove(game.id)}
                                className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white text-sm rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
