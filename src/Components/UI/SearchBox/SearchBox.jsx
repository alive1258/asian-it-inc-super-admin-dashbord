import { IoSearchOutline } from "react-icons/io5";

const SearchBox = ({ className }) => {
  return (
    <>
      {/* search box  */}
      <div className="w-full md:w-fit relative">
        <input
          type="search"
          className={`px-4 py-2 bg-transparent border border-[#929394] text-secondary-base rounded-lg placeholder:text-[#929394] w-full md:w-[613px] ${classNme}`}
          placeholder="Search here..."
        />
        <IoSearchOutline className="absolute top-3.5 right-4 text-base text-[#0064F7]" />
      </div>
    </>
  );
};

export default SearchBox;
