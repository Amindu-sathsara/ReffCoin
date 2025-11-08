// src/components/HeroSection.tsx
import SearchBar from './SearchBar';

export default function HeroSection() {
  return (
    <section className="relative h-96 bg-cover bg-center" style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973')`
    }}>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Looking To Buy or Rent a Property?
        </h1>
        <p className="text-xl mb-8">Find Your Dream Home</p>
        <SearchBar />
      </div>
    </section>
  );
}