import { useState } from 'react';
import api from '../api';

export default function ProductForm({ initial = {}, onDone }) {
  const [form, setForm] = useState({...initial});
  const [file, setFile] = useState(null);

  const handle = e => {
    const { name, value } = e.target;
    setForm(f => ({...f, [name]: value}));
  };

  const submit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach(k => data.append(k, form[k]));
    if (file) data.append('image', file);

    if (initial.id)
      await api.put(`/products/${initial.id}`, data);
    else
      await api.post('/products', data);

    onDone();          // callback to parent
  };

  return (
    <form onSubmit={submit} className="space-y-3 max-w-xl mx-auto p-4">
      <input required name="title" value={form.title||''}
             onChange={handle} placeholder="Title" className="input" />
      <textarea name="description" value={form.description||''}
             onChange={handle} placeholder="Description" className="input" />
      <input required type="number" step="0.01" name="price" value={form.price||''}
             onChange={handle} placeholder="Price" className="input" />
      <input required type="number" name="stock" value={form.stock||''}
             onChange={handle} placeholder="Stock" className="input" />
      <input name="material" value={form.material||''}
             onChange={handle} placeholder="Material" className="input" />
      <select name="cat_id" value={form.cat_id||''} onChange={handle} required className="input">
        <option value="">Category</option>
        <option value="1">Dress</option>
        <option value="2">Co‑ords</option>
        <option value="3">Top</option>
        <option value="4">Jumpsuit</option>
      </select>

      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button className="btn-primary">{initial.id ? 'Update' : 'Create'}</button>
    </form>
  );
}
