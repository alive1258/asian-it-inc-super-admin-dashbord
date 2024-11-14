"use client";

import { MdOutlineNightlight } from "react-icons/md";
import { IoNotificationsOutline, IoClose } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import flags_us from "../../../app/assets/images/circle-flags_us-betsy-ross.png";
import Image from "next/image";
import Profile from "./Profile";
import { useState } from "react";
import MobileNavbar from "./MobileNavbar";
import { useDispatch, useSelector } from "react-redux";
import { sidebarToggle } from "@/redux/features/adminSiteBerSlice";
import MobileScreenProfileModal from "./MobileScreenProfileModal";
import NavbarSearch from "./NavbarSearch";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const { sidebarStatus } = useSelector((state) => state.adminTree);
  const dispatch = useDispatch();
  return (
    <>
      <div className=" w-full top-0  z-[500]  duration-300  transition-transform transform  bg-primary-base md:flex">
        <div className=" flex  w-full  items-center">
          {/* logo and sidebar handle icon  */}

          {sidebarStatus && (
            <div
              onClick={() => dispatch(sidebarToggle())}
              className={`size-10 bg-black-muted ml-2
               rounded-full flex items-center justify-center z-50
               `}
            >
              <IoClose className="text-2xl text-white cursor-pointer " />
            </div>
          )}

          {/* nav for mobile  */}
          <MobileNavbar navbar={navbar} setNavbar={setNavbar} />
          <div className={` hidden px-6 py-4 lg:flex items-center w-full`}>
            <div
              className={`relative mt-24 md:mt-0 w-full grid-cols-2  grid md:grid-cols-3 xl:grid-cols-2  gap-y-6 `}
            >
              {/* search box  */}
              <NavbarSearch />

              {/* notification message  and profile  */}
              <div className=" flex justify-end md:col-span-2 xl:col-span-1   w-full ">
                <div className="flex items-center gap-6">
                  {/* notification, message, country, mode   */}
                  <div className="flex items-center gap-4">
                    <span className="size-10 rounded-full p-2 bg-black-base">
                      <Image src={flags_us} width={24} height={24} alt="flag" />
                    </span>
                    <span className="size-10 rounded-full p-2 bg-black-base">
                      <MdOutlineNightlight className="text-2xl text-white" />
                    </span>
                    {/* notification */}
                    <div className="relative size-10 rounded-full p-2 bg-black-base">
                      <IoNotificationsOutline className="text-2xl text-white" />
                      <span className="absolute -top-2 -right-[2px] size-5 rounded-full text-white bg-[#FF4234] text-[14px] flex items-center justify-center">
                        2
                      </span>
                    </div>
                    {/* message */}
                    <div className="relative size-10 rounded-full p-2 bg-black-base">
                      <AiOutlineMessage className="text-2xl text-white" />
                      <span className="absolute -top-2 -right-[2px] size-5 rounded-full text-white bg-[#0064F7] text-[14px] flex items-center justify-center">
                        5
                      </span>
                    </div>
                  </div>
                  {/* profile  */}
                  <Profile />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full overflow-hidden">
        {navbar && <MobileScreenProfileModal />}
      </div>
    </>
  );
};

export default Navbar;
