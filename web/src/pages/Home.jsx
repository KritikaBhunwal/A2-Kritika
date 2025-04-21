import { Link } from 'react-router-dom';

/**
 * Home — a simple landing page.
 * Introduces the store and highlights a call‑to‑action.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-extrabold mb-4">Welcome to Scarlet Ross Boutique</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl text-center">
        Discover our curated collection of summer‑ready co‑ords, dresses, tops, and jumpsuits.
        Lightweight fabrics and handcrafted details make each piece uniquely yours.
      </p>
      <Link
        to="/products"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Browse Products
      </Link>
    </main>
  );
}
