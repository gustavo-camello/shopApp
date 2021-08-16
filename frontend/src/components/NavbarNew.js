import React from "react";
import { Link } from "react-router-dom";

const NavbarNew = () => {
  return (
    <nav id="header" className="w-full z-30 top-0 py-1">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
        <label for="menu-toggle" className="cursor-pointer md:hidden block">
          <svg
            className="fill-current text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div
          className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1"
          id="menu"
        >
          <nav>
            <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
              <li>
                <Link
                  to="/products"
                  className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                  href="#"
                >
                  Shop
                </Link>
              </li>
              <li>
                <a
                  className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                  href="#"
                >
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="order-1 md:order-2">
          <Link
            to="/"
            className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
            href="#"
          >
            MY SHOP
          </Link>
        </div>

        <div className="order-2 md:order-3 flex items-center" id="nav-content">
          <Link
            to="/"
            className="inline-block no-underline hover:text-black"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
          </Link>

          <Link
            to="/cart"
            className="pl-3 inline-block no-underline hover:text-black"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarNew;
