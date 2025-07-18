'use client';

const genres = [
    { label: 'All', value: '' },
    { label: 'Action', value: 'action' },
    { label: 'RPG', value: 'role-playing-games-rpg' },
    { label: 'Shooter', value: 'shooter' },
];

const platforms = [
    { label: 'All', value: '' },
    { label: 'PC', value: '4' },
    { label: 'PlayStation', value: '18' },
    { label: 'Xbox', value: '1' },
];

const sorts = [
    { label: 'Rating', value: '-rating' },
    { label: 'Released', value: '-released' },
    { label: 'Added', value: '-added' },
];

export default function FilterBar({ onFilterChange }: { onFilterChange: (val: any) => void }) {
    return (
        <div className="flex flex-wrap gap-4 mb-6 text-white">
            <select
                className="bg-[#1c2e2b] p-2 rounded-md"
                onChange={(e) => onFilterChange({ genre: e.target.value })}
            >
                {genres.map((g) => (
                    <option key={g.value} value={g.value}>
                        {g.label}
                    </option>
                ))}
            </select>

            <select
                className="bg-[#1c2e2b] p-2 rounded-md"
                onChange={(e) => onFilterChange({ platform: e.target.value })}
            >
                {platforms.map((p) => (
                    <option key={p.value} value={p.value}>
                        {p.label}
                    </option>
                ))}
            </select>

            <select
                className="bg-[#1c2e2b] p-2 rounded-md"
                onChange={(e) => onFilterChange({ sort: e.target.value })}
            >
                {sorts.map((s) => (
                    <option key={s.value} value={s.value}>
                        Sort: {s.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
