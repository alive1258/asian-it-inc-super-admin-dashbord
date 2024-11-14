import { HiOutlineDotsVertical } from "react-icons/hi";

const TableRow = () => {
  return (
    <>
      <tr className="border-b border-b-[#424445] odd:bg-black-base even:bg-transparent overflow-x-scroll">
        <td className="p-2 text-nowrap">01</td>
        <td className="p-2 text-nowrap">05</td>
        <td className="p-2 text-nowrap">No photo</td>
        <td className="p-2 text-nowrap">Nayem Uddin Sheikh</td>
        <td className="p-2 text-nowrap">Five</td>
        <td className="p-2 text-nowrap">Science</td>
        <td className="p-2 text-nowrap">Male</td>
        <td className="p-2 text-nowrap">01322344858</td>
        <td className="p-2 text-nowrap">Raiganj, Sirajgnaj, Bangladesh</td>
        <td className="p-2 text-nowrap pl-6">
          <HiOutlineDotsVertical className="text-base text-secondary-base" />
        </td>
      </tr>
    </>
  );
};

export default TableRow;
