import ActivityUsers from "@/Components/DashBoardHome/ActivityUsers";
import SellChart from "@/Components/DashBoardHome/SellChart";
import EarningData from "@/Components/EarningData/EarningData";
import Expenses from "@/Components/ExpensesAndStudents/Expenses";
import Students from "@/Components/ExpensesAndStudents/Students";
import ShortOverview from "@/Components/ShortOverview/Overview";

export default function Home() {
  return (
    <>
      <main className="p-4">
        <ShortOverview />
        <div className="flex flex-col md:flex-row gap-5 mt-5">
          <div className="w-full">
            <EarningData />
          </div>

          <div className="w-full flex flex-col md:flex-row items-center gap-6">
            <Expenses />
            <Students />
          </div>
        </div>
        <div className="mt-5">
          <SellChart />
        </div>
        <div className="mt-5">
          <ActivityUsers />
        </div>
      </main>
    </>
  );
}
