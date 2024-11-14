"use client";

import Form from "../../Forms/Form";
import Select from "../../Forms/Select";
import { useForm } from "react-hook-form";

const SearchStudents = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <>
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
            className="w-full h-[37px] md:mt-[32px] text-sm rounded bg-info-base text-white cursor-pointer text-center"
            type="submit"
            value="Search"
          />
        </div>
      </Form>
    </>
  );
};

export default SearchStudents;
