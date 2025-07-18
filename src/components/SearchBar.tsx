'use client';

export default function SearchBar({ onSearch }: { onSearch: (val: string) => void }) {
    return (
        <div className="mb-6">
            <input
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search games..."
                className="w-full p-3 rounded-md bg-[#1c2e2b] text-white"
            />
        </div>
    );
}
