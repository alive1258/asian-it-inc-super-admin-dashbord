import { IoMdArrowDropdown } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import TableRow from "./TableRow";
import CommonPagination from "@/Components/Shared/Pagination/CommonPagination";

const StudentList = () => {
  return (
    <>
      <div className="bg-primary-base rounded-lg p-4 mt-6">
        <h3 className="text-white font-semibold">Search Students</h3>
        {/* filter and search section   */}
        <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4 my-[18px]">
          <div className="flex items-center gap-2 text-white">
            <span className="text-sm">Show</span>
            <div className="relative">
              <select
                className="w-full h-10 p-2 bg-primary-base text-white rounded focus:outline-none border border-secondary-base text-xs appearance-none pr-7"
                defaultValue=""
              >
                <option value="">5</option>
                <option value="">10</option>
                <option value="">20</option>
                <option value="">30</option>
              </select>
              <IoMdArrowDropdown className="absolute right-2 top-3 text-base text-secondary-base pointer-events-none" />
            </div>
            <span className="text-sm">entries</span>
          </div>

          {/* search box  */}
          <div className="w-[267px] relative">
            <input
              type="search"
              className={`px-4 py-2 bg-transparent border  focus:border focus:border-info-base border-[#929394] text-secondary-base rounded-lg text-sm text-white placeholder:text-[#929394] w-full  outline-0 `}
              placeholder="Search here..."
            />
            <IoSearchOutline className="absolute top-3 right-4 text-base text-blue-base" />
          </div>
        </div>

        {/* table  */}
        <div className="w-full overflow-x-scroll md:overflow-x-visible">
          <table className="w-full">
            <thead>
              <tr className="text-white text-[11px] md:text-sm font-semibold text-start border-b border-b-[#424445]">
                <th className="p-2 text-start">#Sl</th>
                <th className="p-2 text-start">Roll</th>
                <th className="p-2 text-start">Photo</th>
                <th className="p-2 text-start">Name</th>
                <th className="p-2 text-start">Class</th>
                <th className="p-2 text-start">Group</th>
                <th className="p-2 text-start">Section</th>
                <th className="p-2 text-start">Mobile</th>
                <th className="p-2 text-start">Address</th>
                <th className="p-2 text-start">Action</th>
              </tr>
            </thead>
            <tbody className="text-white text-[11px] md:text-sm">
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
            </tbody>
          </table>
        </div>
      </div>
      {/* pagination  */}
      <CommonPagination />
    </>
  );
};

export default StudentList;
