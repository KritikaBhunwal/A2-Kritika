import { Link } from 'react-router-dom';

export default function ProductCard({ data }) {
  const imgUrl = `/uploads/${data.image}`;

  return (
    <Link
      to={`/products/${data.id}`}
      className="
        group 
        block 
        max-w-[800px]       /* image/card max‑width */
        mx-auto             /* center card horizontally */
        border 
        rounded-lg          /* smooth corners */
        shadow-md           /* subtle shadow */
        overflow-hidden 
        transition
        hover:shadow-lg     /* deeper shadow on hover */
      "
    >
      <div className="relative">
        <img
          src={imgUrl}
          alt={data.title}
          className="
            w-full 
            h-52 
            object-cover 
            rounded-t-lg      /* round top corners of image */
            shadow-sm         /* image‑specific shadow */
            transition 
            duration-300
            group-hover:scale-[1.01]  /* slight scale on hover */
          "
        />
        {/* Overlay on hover */}
        <div
          className="
            absolute inset-0 
            bg-black bg-opacity-50 
            flex items-center justify-center 
            opacity-0 
            transition-opacity duration-300
            group-hover:opacity-100
          "
        >
          <span className="text-white font-semibold">
            Click to edit
          </span>
        </div>
      </div>

      <div className="p-4 text-center">
        <h3 className="font-semibold mb-2">{data.title}</h3>
        <p className="text-sm text-gray-500 mb-1">{data.category}</p>
        <p className="text-lg font-bold">$ {data.price}</p>
      </div>
    </Link>
  );
}
