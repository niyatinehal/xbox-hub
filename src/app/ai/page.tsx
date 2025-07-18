'use client';

import { useState } from "react";
import Link from "next/link";
import { getSuggestedTitles } from "@/lib/openai";
import { searchGames } from "@/lib/rawg";
import { motion } from "framer-motion";

export default function AiRecommendationsPage() {
    const [input, setInput] = useState("");
    const [games, setGames] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSuggest = async () => {
        if (!input) return;

        setLoading(true);
        setGames([]);

        const suggestions = await getSuggestedTitles(input);
        console.log("SUGGESTIONS", suggestions)
        const results: any[] = [];

        for (const title of suggestions) {
            const found = await searchGames(title);
            if (found.length > 0) results.push(found[0]);
        }

        setGames(results);
        setLoading(false);
    };

    return (
        <div className="px-6 py-10 text-white">
            <h1 className="text-2xl font-bold mb-6">🎯 AI Game Recommendations</h1>

            <div className="flex items-center gap-4 mb-8">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Feeling bored? Describe your mood or interests..."
                    className="flex-1 p-3 rounded-md bg-[#1c2e2b] text-white"
                />
                <button
                    onClick={handleSuggest}
                    disabled={loading}
                    className="bg-green-400 hover:bg-green-500 text-black font-semibold px-4 py-2 rounded-md transition"
                >
                    {loading ? "Loading..." : "Get Suggestions"}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {games.map((game, idx) => (
                    <Link href={`/games/${game.slug}`}>

                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-[#162320] p-4 rounded-lg hover:scale-105 transform transition duration-300"
                    >
                        <img
                            src={game.background_image}
                            alt={game.name}
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-lg font-semibold">{game.name}</h2>
                        <p className="text-sm text-green-300">{game.genres.map((g: any) => g.name).join(", ")}</p>
                    </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
