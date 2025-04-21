import { Link } from 'react-router-dom';

/**
 * Navbar — displays site logo and navigational links.
 * Uses React Router’s <Link> so navigation is client‑side.
 */
export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo on the left */}
        <Link to="/" className="text-2xl font-bold">
          Scarlet Ross
        </Link>

        {/* Menu items */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-blue-600">
              Products
            </Link>
          </li>
          {/* <li>
            <Link to="/about" className="hover:text-blue-600">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}
