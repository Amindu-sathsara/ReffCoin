// src/components/SearchBar.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar() {
  const [location, setLocation] = useState('All Main Locations');
  const router = useRouter();

  const handleSearch = () => {
    if (location !== 'All Main Locations') {
      router.push(`/?location=${location}`);
    }
  };

  return (
    <div className="flex gap-2 bg-white p-2 rounded-lg shadow-md w-full max-w-2xl">
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="px-4 py-2 border-r text-gray-700"
      >
        <option>All Main Locations</option>
        <option>Colombo</option>
        <option>Kandy</option>
        <option>Galle</option>
      </select>
      <select className="px-4 py-2 border-r text-gray-700">
        <option>All Status</option>
      </select>
      <select className="px-4 py-2 text-gray-700">
        <option>All Types</option>
      </select>
      <button className="px-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      <button
        onClick={handleSearch}
        className="px-6 py-2 bg-blue-600 text-white rounded"
      >
        Search
      </button>
    </div>
  );
}