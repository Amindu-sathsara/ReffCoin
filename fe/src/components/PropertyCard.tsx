// src/components/PropertyCard.tsx
'use client';
import { useDeletePropertyMutation } from '@/lib/api';
import toast from 'react-hot-toast';

export default function PropertyCard({ property }: { property: any }) {
  const [deleteProperty] = useDeletePropertyMutation();

  const handleDelete = async () => {
    if (confirm('Delete?')) {
      try {
        await deleteProperty(property._id).unwrap();
        toast.success('Deleted');
      } catch {
        toast.error('Failed');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg">
      <div className="relative">
        <img src={property.image} alt="" className="w-full h-48 object-cover" />
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {property.status}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{property.title}</h3>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {property.location}
        </p>
        <p className="text-xl font-bold text-green-600 mb-1">
          LKR {property.price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707l-7 7A1 1 0 019 15.414V18a1 1 0 01-1.447.894L5.105 17.5A1 1 0 015 16.618V15.414a1 1 0 01.293-.707l-2-2A1 1 0 013 12V4z" />
          </svg>
          {property.area} sq ft
        </p>
        <button onClick={handleDelete} className="mt-3 text-red-600 text-sm hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
}