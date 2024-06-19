import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom"

const navOptions = [
  { name: "Home", value: "general" },
  { name: "Business", value: "business" },
  { name: "Entertainment", value: "entertainment" },
  { name: "Health", value: "health" },
  { name: "Science", value: "science" },
  { name: "Sports", value: "sports" },
  { name: "Technology", value: "technology" }
]

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const { category } = useParams();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="w-full py-4 px-4 sm:px-20 flex justify-between border">
      <div className="relative lg:hidden">
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 border rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded="false"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
        <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden mt-2`}>
          <ul className="flex flex-col border bg-gray-100 rounded-lg">
            {navOptions.map(({ name, value }) => (
              <li key={value} className="">
                <Link to={value} className="block hover:bg-gray-400 px-4 py-2 rounded-lg">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="hidden lg:flex gap-4 border">
        {/* toggle button */}
        {navOptions.map(({ name, value }) => {
          return <Link key={value} to={value} onClick={handleLinkClick}>{name}</Link>
        })}
      </ul>

      <section>
        Search using keyword
      </section>
    </nav>
  )
}
