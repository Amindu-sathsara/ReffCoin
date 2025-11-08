// src/app/add-property/page.tsx
import AdminForm from '@/components/AdminForm';

export default function AddProperty() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto">
        <AdminForm />
      </div>
    </div>
  );
}