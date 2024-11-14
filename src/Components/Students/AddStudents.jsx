"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";

import Input from "@/Components/UI/Forms/Input";
import Select from "@/Components/UI/Forms/Select";
import DateInput from "@/Components/UI/Forms/Date";
import Textarea from "@/Components/UI/Forms/Textarea";

const AddStudents = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <h1 className="font-semibold text-white">Studeasdfasfdnts</h1>
      <div className="flex items-center text-sm py-1">
        <span className=" text-secondary-base font-medium">Home</span>
        <MdKeyboardArrowRight className="" />
        <span className=" bg-blue-base">Add Student</span>
      </div>

      {/* Form section */}
      <div className="bg-primary-base rounded-lg mt-4 p-4">
        <h3 className="text-white font-semibold">Add New Students</h3>

        {/* Call Form Component */}
        <form onSubmit={handleSubmit(onSubmit)} className=" mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  items-start  gap-2">
            <Input
              placeholder="Enter your first name"
              text="firstName"
              label="First Name"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter your last name"
              text="lastName"
              label="Last Name"
              register={register}
              errors={errors}
            />
            <Select
              label="Gender"
              text="gender"
              placeholder="Please select gender"
              options={["Male", "Female", "Other"]}
              register={register}
              errors={errors}
            />
            <DateInput
              label="Date of Birth"
              placeholder="dd/mm/yyyy"
              text="dob"
              register={register}
              setValue={setValue}
            />
            <Input
              placeholder="Enter your roll"
              text="roll"
              label="Roll"
              type="number"
              register={register}
              errors={errors}
            />
            <Select
              label="Blood Group"
              text="bloodGroup"
              placeholder="Please select group"
              options={["A+", "A-", "B+", "B-", "AB+", "AB-"]}
              register={register}
              errors={errors}
            />
            <Select
              label="Religion"
              text="religion"
              placeholder="Please select religion"
              options={["Islam", "Hindu", "Buddho"]}
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter your email"
              text="email"
              label="Email"
              type="email"
              register={register}
              errors={errors}
            />
            <Select
              label="Class"
              text="class"
              placeholder="Please select class"
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
            <div className="mt-1">
              <Input
                placeholder="Enter your admission ID"
                text="admissionId"
                label="Admission ID"
                type="number"
                register={register}
                errors={errors}
                require={false}
              />
            </div>
            <div className="mt-1">
              <Input
                placeholder="Enter your phone no."
                text="phoneNumber"
                label="Phone"
                type="number"
                register={register}
                require={false}
                errors={errors}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-5 mt-6 ">
            {/* textarea for boi  */}
            <div className="md:col-span-2">
              <Textarea
                placeholder="Write your bio"
                label="Short BIO"
                text="bio"
                register={register}
                require={true}
                errors={errors}
              />
            </div>
            <div className="md:col-span-1 space-y-12">
              {/* photo (file) upload  */}
              <div className="flex flex-col gap-2 mt-3 md:mt-7">
                <label className="text-sm text-white">
                  {"Upload Student Photo (150px X 150px)"}
                </label>
                <input
                  type="file"
                  className="w-full h-10 p-2 pl-0 pt-1 file:bg-primary-base file:border file:border-secondary-base file:mr-2  file:text-[#B9BABB] file:text-xs text-[#616264]  file:p-2 file:rounded-lg rounded focus:outline-none placeholder:text-[#B9BABB] text-sm"
                />
              </div>
              {/* submit button  */}
              <input
                className="mt-8 p-2 text-sm rounded bg-info-base text-white w-full md:w-24 cursor-pointer"
                type="submit"
                value="Save"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddStudents;
