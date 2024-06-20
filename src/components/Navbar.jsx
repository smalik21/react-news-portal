import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"

const navOptions = [
  { name: "General", value: "general" },
  { name: "Business", value: "business" },
  { name: "Entertainment", value: "entertainment" },
  { name: "Health", value: "health" },
  { name: "Science", value: "science" },
  { name: "Sports", value: "sports" },
  { name: "Technology", value: "technology" }
]

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navbarRef = useRef(null);
  const buttonRef = useRef(null);
  const keywordRef = useRef(null);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // console.log(location.pathname)
    const handleClickOutside = (event) => {
      if (navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActiveLink = (value) => {
    return location.pathname === `/${value}`;
  };

  const handleKeywordSearch = (e) => {
    e.preventDefault()

    const keyword = keywordRef.current.value
    if (keyword === "") return

    keywordRef.current.value = ""

    navigate(`/search/${keyword}`)
  }

  return (
    <>
      <nav className="w-full py-4 px-4 sm:px-20 flex justify-between items-center border">
        <section className="lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md border text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={toggleMenu}
            ref={buttonRef}
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
        </section>

        <ul className="hidden lg:flex gap-6">
          {navOptions.map(({ name, value }) => {
            return <Link
              key={value}
              to={value}
              className={`${isActiveLink(value) ? "text-blue-400" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {name}
            </Link>
          })}
        </ul>

        <section>
          <form
            onSubmit={handleKeywordSearch}
            className="pl-3 py-1 flex justify-between items-center border rounded-lg"
          >
            <input
              type="text"
              placeholder="Search by keyword"
              ref={keywordRef}
              className="outline-none"
            />
            <button type="submit" className="px-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="7" stroke="black" strokeWidth="2" />
                <line x1="16.7071" y1="16.7071" x2="21" y2="21" stroke="black" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

          </form>
        </section>
      </nav>

      <section className={`${isOpen ? 'block' : 'hidden'} lg:hidden w-full py-4 px-4 sm:px-20`} ref={navbarRef}>
        <ul className="flex flex-col border bg-gray-100 rounded-lg">
          {navOptions.map(({ name, value }) => (
            <li key={value}>
              <Link
                to={value}
                className={`block hover:bg-gray-400 px-4 py-2 rounded-lg ${isActiveLink(value) ? "bg-blue-500 text-white hover:bg-blue-500" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
