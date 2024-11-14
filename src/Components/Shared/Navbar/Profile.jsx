import Image from "next/image";
import profile from "../../../app/assets/images/profile.png";
import { IoIosArrowDown } from "react-icons/io";

const Profile = () => {
  return (
    <>
      <div className="w-full min-w-[180px]  absolute -top-20 md:static flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={profile}
            className="rounded-full"
            width={40}
            height={40}
            alt="profile"
          />
          <div>
            <h6 className="text-[16px] font-semibold text-[#E7E8E8]">
              Nayem Uddin
            </h6>
            <span className="text-[14px] text-primary-muted">Admin</span>
          </div>
        </div>
        <IoIosArrowDown className="text-[22px] text-primary-muted" />
      </div>
    </>
  );
};

export default Profile;
