import React from "react";
import Link from "next/link";
import { Container } from "@nextui-org/react";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-8 sm:px-20 max-w-screen-xl m-auto">
      <h1 className="font-bold text-xl">
        Next<span className="font-light">xkcd</span>
      </h1>
      <nav className="">
        <ul className="flex flex-row gap-2 font-bold items-center">
          <li className="mb-0">
            <Link href="/">
              <a className="text-xm font-semibold">Home</a>
            </Link>
          </li>
          <li className="mb-0">
            <Link href="/about">
              <a className="text-xm font-semibold">About</a>
            </Link>
          </li>
          <li className="mb-0">
            <Link href="/search">
              <a className="text-xm font-semibold">Search</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
