// src/components/Pagination.tsx
export default function Pagination() {
  return (
    <div className="flex justify-center gap-2 mt-8">
      <button className="px-3 py-1 border rounded bg-yellow-400 text-black">1</button>
      <button className="px-3 py-1 border rounded">2</button>
      <button className="px-3 py-1 border rounded">3</button>
      <button className="px-3 py-1 border rounded">4</button>
    </div>
  );
}