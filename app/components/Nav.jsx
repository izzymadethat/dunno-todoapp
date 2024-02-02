"use client";

import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setToggleDropdown(!toggleDropdown);
  };

  return (
    <nav className={`nav_bar ${inter.className}`}>
      <Link href="/" className="flex_center gap-2">
        <Image src="assets/images/logo.svg" alt="logo" width={40} height={40} />
        <p className="text-lg font-extrabold tracking-wider uppercase">dunno</p>
      </Link>

      <div className="message">Saving your tasks coming soon!</div>

      {/* <div className={"hidden sm:flex gap-4"}>
        <Link href={"/login"}>Login</Link>
        <Link href={"/signup"}>Sign Up</Link>
      </div> */}

      {/* Mobile Device */}
      {/* <Image
        src={
          toggleDropdown ? "assets/images/close.svg" : "assets/images/menu.svg"
        }
        width={20}
        height={20}
        className="sm:hidden cursor-pointer"
        onClick={handleToggleDropdown}
      /> */}

      {/* Dropdown menu */}
      {/* {toggleDropdown && (
        <div className="absolute top-2 right-5 z-30 flex flex-col p-6 bg-slate-500 text-white rounded-md space-y-6 text-sm sm:hidden">
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign Up</Link>
        </div>
      )} */}
    </nav>
  );
};

export default Nav;
