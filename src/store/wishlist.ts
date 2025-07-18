import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Game = {
    id: number;
    name: string;
    slug: string;
    background_image: string;
    genres: { name: string }[];
};

interface WishlistStore {
    wishlist: Game[];
    add: (game: Game) => void;
    remove: (id: number) => void;
    isWishlisted: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            wishlist: [],
            add: (game) => {
                if (!get().wishlist.find((g) => g.id === game.id)) {
                    set({ wishlist: [...get().wishlist, game] });
                }
            },
            remove: (id) => {
                set({ wishlist: get().wishlist.filter((g) => g.id !== id) });
            },
            isWishlisted: (id) => {
                return get().wishlist.some((g) => g.id === id);
            },
        }),
        {
            name: 'wishlist-store', // localStorage key
        }
    )
);
