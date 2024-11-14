"use client";
import Footer from "@/Components/Shared/Footer/Footer";
import Navbar from "@/Components/Shared/Navbar/Navbar";
import Sidebar from "@/Components/Shared/Sidebar/Sidebar";
import { sidebarMobileToggle } from "@/redux/features/adminSiteBerSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
const DashboardLayout = ({ children }) => {
  // Add your custom styles here and return the layout component.
  const { sidebarMobileStatus, sidebarStatus } = useSelector(
    (state) => state.adminTree
  );

  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  // Handle clicking outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        dispatch(sidebarMobileToggle());
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <>
      <div className={`bg-[#131517] text-white  `}>
        <div className="flex items-start lg:gap-1  duration-300">
          <div>
            <div
              className={`${
                sidebarStatus
                  ? "-translate-x-full  duration-500  ease-in-out"
                  : " duration-500  ease-in-out"
              }`}
            >
              {!sidebarStatus && (
                <div className="hidden lg:block ">
                  <Sidebar />
                </div>
              )}
            </div>

            {sidebarMobileStatus && (
              <div className=" lg:hidden  top-16 fixed bg-[#0000006b]  h-full overflow-y-auto w-full z-[999]  ">
                <Sidebar
                  sidebarMobileStatus={sidebarMobileStatus}
                  sidebarRef={sidebarRef}
                />
              </div>
            )}
          </div>
          {/* <div className=" w-full  md:min-w-[800px] relative">
            <Navbar />
            <div className="">{children}</div>
            <Footer className=" bottom-0" />
          </div> */}
          <div className="w-full min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow mb-6">{children}</div>
            <Footer className="bottom-0" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
