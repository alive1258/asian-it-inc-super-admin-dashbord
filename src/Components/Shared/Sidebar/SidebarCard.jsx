"use client";
import { sidebarMobileToggle } from "@/redux/features/adminSiteBerSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Collapse } from "react-collapse";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";

const SidebarCard = ({ item, setActiveSidebar, activeSidebar }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  // Check if the current item or any sub-item is active
  const isActive =
    pathname === item.path ||
    item.sub?.some((subItem) => subItem.path === pathname);

  // Handle click to open or close collapsible items
  const handleClick = () => {
    // If the clicked item is already active, close it
    if (activeSidebar === item?.id) {
      setActiveSidebar(null); // Close if clicked again
    } else {
      setActiveSidebar(item?.id); // Open this one and close others
    }
  };

  return (
    <div>
      {item?.sub?.length > 0 ? (
        <div>
          {/* Parent item with collapsible sub-items */}
          <div
            onClick={handleClick}
            className={`${
              isActive || activeSidebar === item?.id
                ? "text-white bg-blue-base"
                : "text-[#ADB5BD]"
            } flex items-center justify-between hover:bg-blue-base ${
              isActive || activeSidebar === item?.id
                ? "text-white"
                : "text-secondary-base"
            } hover:text-white gap-3 duration-300 p-2 my-2 rounded cursor-pointer`}
          >
            <div className="flex items-center gap-2">
              <span className={`text-lg transition duration-75`}>
                {item.Icon}
              </span>
              <span className={`text-[16px] capitalize whitespace-nowrap`}>
                {item?.name}
              </span>
            </div>

            {/* Chevron icon toggle based on open/close state */}
            <FaChevronRight
              className={`duration-300 text-[16px] ${
                activeSidebar === item?.id ? "rotate-90" : "rotate-0"
              } `}
            />
          </div>

          {/* Collapse component for sub-items */}
          <Collapse isOpened={activeSidebar === item?.id}>
            {item?.sub?.map((subItem, index) => (
              <div className="ml-3 mb-2" key={index}>
                <Link
                  onClick={() => dispatch(sidebarMobileToggle())}
                  className={`px-3 py-2 flex items-center gap-2 rounded text-sm capitalize hover:bg-blue-base hover:text-white duration-200 ${
                    pathname === subItem.path ? "bg-blue-base text-white" : ""
                  }`}
                  href={subItem?.path}
                >
                  <span className="text-lg">{subItem?.Icon}</span>
                  <span>{subItem?.name}</span>
                </Link>
              </div>
            ))}
          </Collapse>
        </div>
      ) : (
        // Single item without sub-items
        <Link
          href={item.path}
          onClick={() => {
            dispatch(sidebarMobileToggle()), setActiveSidebar(item?.id);
          }}
        >
          <div
            className={`${
              isActive ? "text-white bg-blue-base" : "text-[#ADB5BD]"
            } flex items-center justify-between gap-3 ${
              isActive ? "text-white" : "text-secondary-base"
            } hover:text-white duration-300 hover:bg-blue-base p-2 my-2 rounded cursor-pointer`}
          >
            <div className="flex items-center gap-2">
              <span className={`text-lg transition duration-75`}>
                {item.Icon}
              </span>
              <span className={`text-[16px] capitalize whitespace-nowrap`}>
                {item?.name}
              </span>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default SidebarCard;
