import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import EarningChart from "./EarningChart";
import OverviewCard from "../ShortOverview/OverviewCard";

const EarningData = () => {
  return (
    <>
      <div className="bg-primary-base px-4 py-6 rounded-lg w-ful">
        <h1 className="text-[22px] font-medium text-white pb-2">Earnings</h1>
        <div className="flex items-start mb-8">
          <div className="w-[179px]">
            <p className="text-secondary-base">Total Collections</p>
            <h3 className="text-xl font-medium text-[#0064F7]">$14500</h3>
          </div>
          <div className="w-[179px]">
            <p className="text-secondary-base">Total Collections</p>
            <h3 className="text-xl font-medium text-[#FF4234]">$5025</h3>
          </div>
          <div className="w-[179px] flex items-center gap-2">
            <p className="text-secondary-base text-sm">Sep 05, 2024</p>
            <FaChevronDown className="text-secondary-base" />
          </div>
        </div>

        <EarningChart />
      </div>
    </>
  );
};

export default EarningData;
