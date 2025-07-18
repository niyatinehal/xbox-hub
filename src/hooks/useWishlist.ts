import { useEffect, useState } from 'react';

export function useWishlist() {
    const [wishlist, setWishlist] = useState<any[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('wishlist');
        if (stored) {
            setWishlist(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (game: any) => {
        if (!wishlist.find((g) => g.id === game.id)) {
            setWishlist([...wishlist, game]);
        }
    };

    const removeFromWishlist = (id: number) => {
        setWishlist(wishlist.filter((g) => g.id !== id));
    };

    const isWishlisted = (id: number) => wishlist.some((g) => g.id === id);

    return {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
    };
}
