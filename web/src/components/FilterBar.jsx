import { useEffect, useState } from 'react';

export default function FilterBar({ onChange }) {
    const [state, setState] = useState({
      minPrice:'', maxPrice:'', inStock:false, category:''
    });
  
    const handleChange = e => {
      const { name, value, type, checked } = e.target;
      setState(s => ({...s, [name]: type==='checkbox'? checked : value}));
    };
  
    useEffect(() => onChange(state), [state, onChange]);
  
    return (
      <form className="flex flex-wrap gap-4 mb-4">
        <input name="minPrice" placeholder="Min $" onChange={handleChange}
               className="border p-2 w-24" />
        <input name="maxPrice" placeholder="Max $" onChange={handleChange}
               className="border p-2 w-24" />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="inStock" onChange={handleChange}/>
          In stock
        </label>
        <select name="category" onChange={handleChange} className="border p-2">
          <option value="">All categories</option>
          <option value="1">Dress</option>
          <option value="2">Co‑ords</option>
          <option value="3">Top</option>
          <option value="4">Jumpsuit</option>
        </select>
      </form>
    );
  }
  