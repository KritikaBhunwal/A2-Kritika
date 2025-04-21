import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api';
import ProductForm from '../components/ProductForm';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}`).then(r => setItem(r.data));
  }, [id]);

  const deleteItem = async () => {
    if (confirm('Delete?')) {
      await api.delete(`/products/${id}`);
      navigate('/products');
    }
  };

  if (!item) return <p className="p-4">Loading...</p>;
  if (editing) return (
    <ProductForm initial={item} onDone={() => setEditing(false)} />
  );

  return (
    <section className="max-w-xl mx-auto p-4">
      <img src={`/uploads/${item.image}`} className="w-full rounded" />
      <h1 className="text-2xl font-bold mt-4">{item.title}</h1>
      <p className="text-gray-500">{item.category}</p>
      <p className="mt-2">{item.description}</p>
      <p className="mt-2">Material: {item.material}</p>
      <p className="mt-2">In stock: {item.stock}</p>
      <p className="mt-2 text-lg">$ {item.price}</p>

      <div className="flex gap-3 mt-4">
        <button onClick={() => setEditing(true)} className="btn-primary">Edit</button>
        <button onClick={deleteItem} className="btn-danger">Delete</button>
      </div>
    </section>
  );
}
