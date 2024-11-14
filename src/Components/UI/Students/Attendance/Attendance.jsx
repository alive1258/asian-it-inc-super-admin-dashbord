"use client";
import { MdKeyboardArrowRight } from "react-icons/md";
import SearchStudents from "../SearchStudents/SearchStudents";
import AttendanceSheet from "./AttendanceSheet";

const AttendanceStudentPage = () => {
  return (
    <>
      <h1 className="font-semibold text-white">Students</h1>
      <div className="flex items-center text-sm">
        <span className="text-[#B6B6B7] font-medium">Home</span>
        <MdKeyboardArrowRight className="text-info-base" />
        <span className="text-info-base">Attendance</span>
      </div>

      {/* Form section */}
      <div className="bg-primary-base rounded-lg mt-4 p-4">
        <h3 className="text-white font-semibold">Search Students</h3>

        {/* Call Form Component */}
        <SearchStudents />
      </div>

      {/* Attendance sheet  */}
      <AttendanceSheet />
    </>
  );
};

export default AttendanceStudentPage;
