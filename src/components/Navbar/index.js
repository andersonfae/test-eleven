import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

export function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <header
      id="header"
      className="flex items-center justify-between fixed text-white px-4 py-4 z-50 right-0 left-0 top-0 bg-black/[.5]"
    >
      <a href="/">
        <span className="flex items-center text-4xl uppercase font-logo">
          Eleven Dragons
        </span>
      </a>
      <nav>
        <section className="MOBILE-MENU flex lg:hidden items-center">
          <Link to={"/signup"}>
            {" "}
            <button className="flex shadow bg-[#8718E1] hover:bg-[#8718E1] focus:shadow-outline focus:outline-none text-white text-xs py-2.5 px-4 rounded mr-16 uppercase">
              {" "}
              Sign Up
            </button>
          </Link>
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
          >
            <span className="block h-0.5 w-8 bg-white"></span>
            <span className="block h-0.5 w-8 bg-white"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            {" "}
            <div
              className="CROSS-ICON absolute top-11 right-4 px-5 py-5 rounded-full border-2
              border-white hover:bg-white text-white ml-4"
              onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
            >
              <svg
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px] text-5xl font-serif">
              <li className="pt-14 pb-10">
                <a href="/">Home</a>
              </li>
              <li className="pb-10">
                <a href="/jobs">Jobs</a>
              </li>
              <span className="pb-10">
                <a href="/profile">Your profile</a>
              </span>
              <li className="flex shadow bg-purple-600 hover:bg-purple-600 focus:shadow-outline focus:outline-none text-white py-2.5 px-4 rounded">
                <a href="/">Logout</a>
              </li>
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/jobs">Jobs</a>
          </li>

          <a href="/profile">Your profile</a>

          <li className="flex shadow bg-purple-600 hover:bg-purple-600 focus:shadow-outline focus:outline-none text-white py-2.5 px-4 rounded">
            <a href="/">Logout</a>
          </li>
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: black;
        z-index: 50;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </header>
  );
}
