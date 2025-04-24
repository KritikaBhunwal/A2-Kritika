import { useState, useEffect } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});

  // Build query string from filters
  const query = new URLSearchParams(filters).toString();

  useEffect(() => {
    api.get(`/products?${query}`).then(res => setProducts(res.data));
  }, [query]);

  return (
    <section className="container mx-auto p-4 gap-4">
      <FilterBar onChange={setFilters} />

      {/* 2 items per row, 1rem gap */}
      <div className="grid grid-cols-2 gap-4">
        {Array.isArray(products) && products.map(p => (
          <ProductCard key={p.id || Math.random()} data={p} />
        ))}
      </div>
    </section>
  );
}
