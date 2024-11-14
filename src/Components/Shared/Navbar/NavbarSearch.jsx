import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const NavbarSearch = () => {
  return (
    <>
      <div className="w-full md:col-span-1 xl:col-span-1 relative">
        <input
          type="search"
          className="px-4 py-2 bg-transparent border border-[#929394] text-white focus:border focus:border-info-base text-secondary-base  rounded-lg placeholder:text-[#929394] w-full outline-none"
          placeholder="Search here..."
        />
        <IoSearchOutline className="absolute top-3.5 right-4 text-base text-[#0064F7]" />
      </div>
    </>
  );
};

export default NavbarSearch;
