"use client";

import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import Form from "../../Forms/Form";
import Select from "../../Forms/Select";
import StudentList from "./StudentList";

const ManageStudentPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <h1 className="font-semibold text-white">Students</h1>
      <div className="flex items-center text-sm">
        <span className="text-[#B6B6B7] font-medium">Home</span>
        <MdKeyboardArrowRight className="text-blue-base" />
        <span className="text-blue-base">Manage Student</span>
      </div>

      {/* Form section */}
      <div className="bg-primary-base rounded-lg mt-4 p-4">
        <h3 className="text-white font-semibold">Search Students</h3>

        {/* Call Form Component */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Select
              label="Academic Year"
              text="academicYear"
              placeholder="Select Academic Year"
              options={["19-20", "20-21", "21-22", "22-23", "23-24"]}
              register={register}
              errors={errors}
            />
            <Select
              label="Class"
              text="class"
              placeholder="Select Class"
              options={[1, 2, 3, 4, 5]}
              register={register}
              errors={errors}
            />

            <Select
              label="Section"
              text="section"
              placeholder="Please select section"
              options={["A", "B", "C", "D"]}
              register={register}
              errors={errors}
            />
            <Select
              label="Group"
              text="group"
              placeholder="Select Group"
              options={["A", "B", "C", "D"]}
              register={register}
              errors={errors}
            />
            {/* submit button  */}
            <input
              className="w-full h-[37px] md:mt-[32px] text-sm rounded bg-blue-base text-white cursor-pointer text-center"
              type="submit"
              value="Search"
            />
          </div>
        </Form>
      </div>

      {/* student list  */}
      <StudentList />
    </>
  );
};

export default ManageStudentPage;
