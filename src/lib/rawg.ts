const RAWG_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export async function searchGames(query: string) {
    const res = await fetch(`${BASE_URL}/games?search=${query}&key=${RAWG_KEY}&page_size=5`);
    const data = await res.json();
    return data.results;
}

export async function fetchGameDetails(slug: string) {
    const res = await fetch(
        `https://api.rawg.io/api/games/${slug}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    );
    if (!res.ok) return null;
    return res.json();
}

export async function fetchFeaturedGames() {
    console.log(`${BASE_URL}/games?key=${RAWG_KEY}&ordering=-added&page_size=4`)
    const res = await fetch(`https://api.rawg.io/api/games?key=${RAWG_KEY}&ordering=-added&page_size=4`);
    const data = await res.json();
    return data.results;
}

// Get popular games (top-rated or trending)
export async function fetchPopularGames() {
    const res = await fetch(`https://api.rawg.io/api/games?key=${RAWG_KEY}&ordering=-rating&page_size=12`);
    const data = await res.json();
    return data.results;
}


export async function fetchGames({
    search = '',
    genre = '',
    platform = '',
    sort = '-rating'
}) {
    const params = new URLSearchParams({
        key: RAWG_KEY || '',
        ordering: sort,
        page_size: '12',
    });

    if (search) params.append('search', search);
    if (genre) params.append('genres', genre);
    if (platform) params.append('platforms', platform);

    const res = await fetch(`https://api.rawg.io/api/games?${params.toString()}`);
    const data = await res.json();
    return data.results || [];
}