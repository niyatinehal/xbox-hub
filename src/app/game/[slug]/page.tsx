import { notFound } from "next/navigation";
import { fetchGameDetails } from "@/lib/rawg";
import { Metadata } from "next";

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return {
        title: `${params.slug} - Game Details | GameHub`,
    };
}

export default async function GameDetailsPage({ params }: Props) {
    const game = await fetchGameDetails(params.slug);
    if (!game) return notFound();

    return (
        <div className="p-6 text-white">
            <div className="mb-6">
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full max-h-[400px] object-cover rounded-md"
                />
            </div>

            <h1 className="text-3xl font-bold mb-2">{game.name}</h1>
            <p className="text-green-300 mb-4">{game.genres.map((g: any) => g.name).join(", ")}</p>

            <div className="mb-4">
                <p><strong>Released:</strong> {game.released}</p>
                <p><strong>Rating:</strong> {game.rating} / 5</p>
                <p><strong>Platforms:</strong> {game.platforms.map((p: any) => p.platform.name).join(", ")}</p>
            </div>

            <p className="leading-relaxed text-gray-300">{game.description_raw}</p>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {game.short_screenshots?.map((shot: any) => (
                    <img
                        key={shot.id}
                        src={shot.image}
                        alt="screenshot"
                        className="rounded-md object-cover h-40 w-full"
                    />
                ))}
            </div>
        </div>
    );
}
