import SheetRow from "./SheetRow";

const AttendanceSheet = () => {
  return (
    <>
      <div className="w-full overflow-x-auto  bg-primary-base rounded-lg p-4 mt-6">
        <h6 className="text-[#B6B6B7] text-sm md:text-base font-medium md:font-semibold pb-4">
          Attendance Sheet of <span className="text-white">Class Five</span>:
          Section <span className="text-white">Male</span>,{" "}
          <span className="text-white">August 2024</span>
        </h6>
        {/* table  */}
        {/* <div className="w-full overflow-x-scroll md:overflow-x-visible"> */}
        <table className="w-full border-collapse border border-neutral-base">
          <thead>
            <tr className="text-white text-[11px] md:text-sm font-semibold text-start border-b border-b-[#424445]">
              <th className="p-2 text-start border border-neutral-base">
                Students
              </th>
              <th className="border border-neutral-base p-2">1</th>
              <th className="border border-neutral-base p-2">2</th>
              <th className="border border-neutral-base p-2">3</th>
              <th className="border border-neutral-base p-2">4</th>
              <th className="border border-neutral-base p-2">5</th>
              <th className="border border-neutral-base p-2">6</th>
              <th className="border border-neutral-base p-2">7</th>
              <th className="border border-neutral-base p-2">8</th>
              <th className="border border-neutral-base p-2">9</th>
              <th className="border border-neutral-base p-2">10</th>
              <th className="border border-neutral-base p-2">11</th>
              <th className="border border-neutral-base p-2">12</th>
              <th className="border border-neutral-base p-2">13</th>
              <th className="border border-neutral-base p-2">14</th>
              <th className="border border-neutral-base p-2">15</th>
              <th className="border border-neutral-base p-2">16</th>
              <th className="border border-neutral-base p-2">17</th>
              <th className="border border-neutral-base p-2">18</th>
              <th className="border border-neutral-base p-2">19</th>
              <th className="border border-neutral-base p-2">20</th>
              <th className="border border-neutral-base p-2">21</th>
              <th className="border border-neutral-base p-2">22</th>
              <th className="border border-neutral-base p-2">23</th>
              <th className="border border-neutral-base p-2">24</th>
              <th className="border border-neutral-base p-2">25</th>
              <th className="border border-neutral-base p-2">26</th>
              <th className="border border-neutral-base p-2">27</th>
              <th className="border border-neutral-base p-2">28</th>
              <th className="border border-neutral-base p-2">29</th>
              <th className="border border-neutral-base p-2">30</th>
              <th className="border border-neutral-base p-2">31</th>
            </tr>
          </thead>
          <tbody className="text-white text-[11px] md:text-sm">
            <SheetRow />
            <SheetRow />
            <SheetRow />
            <SheetRow />
            <SheetRow />
            <SheetRow />
            <SheetRow />
            <SheetRow />
            <SheetRow />
            <SheetRow />
            <SheetRow />
            <SheetRow />
            <SheetRow />
            <SheetRow />
          </tbody>
        </table>
        {/* </div> */}
      </div>
    </>
  );
};

export default AttendanceSheet;
