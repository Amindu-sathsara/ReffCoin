// src/components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          Real Estate
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link
            href="/add-property"
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium"
          >
            Add Property
          </Link>
        </div>
      </div>
    </header>
  );
}