// src/components/AdminForm.tsx
'use client';

import { useState } from 'react';
import { useCreatePropertyMutation } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminForm() {
  const [form, setForm] = useState({
    title: '',
    image: '',
    slug: '',
    location: 'Colombo' as 'Colombo' | 'Kandy' | 'Galle',
    description: '',
    price: 0,
    type: 'Villa' as 'Single Family' | 'Villa',
    status: 'For Sale' as 'For Sale' | 'For Rent',
    area: 0,
  });

  const [createProperty, { isLoading, error }] = useCreatePropertyMutation();

  // Cloudinary Widget
  const openCloudinary = () => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      toast.error('Cloudinary config missing');
      return;
    }

    // Load Cloudinary script only once
    if (!(window as any).cloudinary) {
      const script = document.createElement('script');
      script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
      script.async = true;
      document.body.appendChild(script);
      script.onload = initWidget;
    } else {
      initWidget();
    }

    function initWidget() {
      // @ts-ignore
      window.cloudinary.openUploadWidget(
        {
          cloudName,
          uploadPreset,
          sources: ['local', 'url', 'camera'],
          cropping: true,
          multiple: false,
          folder: 'refcoins',
          clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
        },
        (error: any, result: any) => {
          if (!error && result?.event === 'success') {
            setForm({ ...form, image: result.info.secure_url });
            toast.success('Image uploaded!');
          }
        }
      );
    }
  };

  const generateSlug = () => {
    const slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setForm({ ...form, slug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.image) {
      toast.error('Please upload an image');
      return;
    }

    try {
      await createProperty(form).unwrap();
      toast.success('Property added successfully!');
      setForm({
        title: '',
        image: '',
        slug: '',
        location: 'Colombo',
        description: '',
        price: 0,
        type: 'Villa',
        status: 'For Sale',
        area: 0,
      });
    } catch (err: any) {
      console.error('Submit error:', err);
      toast.error(err.data?.message || 'Failed to add property');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Add New Property</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title + Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                onBlur={generateSlug}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Luxury Villa in Colombo"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                value={form.slug}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                placeholder="luxury-villa-colombo"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image *</label>
            <button
              type="button"
              onClick={openCloudinary}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Upload Image
            </button>
            {form.image && (
              <div className="mt-4">
                <img
                  src={form.image}
                  alt="Property preview"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          {/* Location + Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <select
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Colombo</option>
                <option>Kandy</option>
                <option>Galle</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Single Family</option>
                <option>Villa</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500"
              placeholder="Beautiful villa with ocean view..."
              required
            />
          </div>

          {/* Price, Status, Area */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (LKR) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: +e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="75000000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area (sq ft) *</label>
              <input
                type="number"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: +e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="3500"
                required
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm">
              {(error as any).data?.message || 'Something went wrong'}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || !form.image}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isLoading ? 'Adding Property...' : 'Add Property'}
          </button>
        </form>
      </div>
    </div>
  );
}