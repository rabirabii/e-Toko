import { useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        Sign up and get 20% off to your first order.{" "}
        <a href="#" className="underline">
          Sign Up Now
        </a>
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex items-center justify-between relative">
        <h1 className="text-2xl font-bold">SHOP.CO</h1>
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent z-50 shadow-lg md:shadow-none`}
        >
          <a
            href="#"
            className="px-4 py-2 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-600"
          >
            Shop
          </a>
          <a
            href="#"
            className="px-4 py-2 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-600"
          >
            On Sale
          </a>
          <a
            href="#"
            className="px-4 py-2 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-600"
          >
            New Arrivals
          </a>
          <a
            href="#"
            className="px-4 py-2 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-600"
          >
            Brands
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <input
            type="search"
            placeholder="Search for products..."
            className="border rounded-full px-4 py-2 w-64 hidden md:block"
          />
          <ShoppingCart className="w-6 h-6" />
          <User className="w-6 h-6" />
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-5xl font-bold mb-4 leading-tight">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h2>
          <p className="text-gray-600 mb-6">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition duration-300">
            Shop Now
          </button>
          <div className="flex justify-between mt-12">
            <div>
              <h3 className="text-4xl font-bold">200+</h3>
              <p className="text-gray-600">International Brands</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">2,000+</h3>
              <p className="text-gray-600">High-Quality Products</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">30,000+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src="/placeholder.svg?height=600&width=500"
            alt="Stylish couple wearing fashionable clothes"
            className="w-full h-auto object-cover"
          />
        </div>
      </main>

      {/* Brand logos */}
      <div className="container mx-auto px-4 py-8 flex flex-wrap justify-between items-center">
        <img
          src="/placeholder.svg?height=30&width=100"
          alt="Versace"
          className="h-8 mb-4 md:mb-0"
        />
        <img
          src="/placeholder.svg?height=30&width=100"
          alt="Zara"
          className="h-8 mb-4 md:mb-0"
        />
        <img
          src="/placeholder.svg?height=30&width=100"
          alt="Gucci"
          className="h-8 mb-4 md:mb-0"
        />
        <img
          src="/placeholder.svg?height=30&width=100"
          alt="Prada"
          className="h-8 mb-4 md:mb-0"
        />
        <img
          src="/placeholder.svg?height=30&width=100"
          alt="Calvin Klein"
          className="h-8 mb-4 md:mb-0"
        />
      </div>
    </div>
  );
}
