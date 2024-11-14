import { FaCheck } from "react-icons/fa6";
import { HiMiniXMark } from "react-icons/hi2";

const SheetRow = ({ attendande = true }) => {
  return (
    <>
      <tr className="odd:bg-black-base even:bg-transparent overflow-x-scroll">
        <td className="p-2 border text-nowrap border-[#424445]">Nayem Uddin</td>
        {/* <td>
          {attendande ? (
            <FaCheck className="text-base text-[#00B45F]" />
          ) : (
            <HiMiniXMark className="text-base text-[#FF4234 ]" />
          )}
        </td> */}
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <HiMiniXMark className="text-base text-[#FF4234]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <HiMiniXMark className="text-base text-[#FF4234]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <HiMiniXMark className="text-base text-[#FF4234]" />{" "}
        </td>
        <td className="border border-[#424445] p-2 text-lg text-white">-</td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <HiMiniXMark className="text-base text-[#FF4234]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2 text-lg text-white">-</td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2 text-lg text-white">-</td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <HiMiniXMark className="text-base text-[#FF4234]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2 text-lg text-white">-</td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
        <td className="border border-[#424445] p-2">
          {" "}
          <FaCheck className="text-base text-[#00B45F]" />{" "}
        </td>
      </tr>
    </>
  );
};

export default SheetRow;
