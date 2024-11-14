"use client";
import { useForm } from "react-hook-form";
// import SubmitButton from "@/components/UI/Button/SubmitButton";
// import SelectForm from "@/components/UI/Forms/SelectForm";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { getFromLocalStorage } from "@/hooks/local-storage";
import { useCreateUserMutation } from "@/redux/api/userApi";
import { storeOTPData } from "@/redux/features/otpSlice";

import Input from "../UI/Forms/Input";
import SelectForm from "../UI/Forms/SelectForm";
import { ImSpinner10 } from "react-icons/im";

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // for strong password
  const pattern = {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character",
  };
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const userId = getFromLocalStorage("userId");
  if (userId) {
    router.push("/otp");
  }

  const [createUser, { isLoading }] = useCreateUserMutation();

  const onSubmit = async (data) => {
    const {
      first_name,
      last_name,
      email,
      mobile,
      password,
      nid_number,
      photo,
      gender,
    } = data;

    const user = {
      first_name,
      last_name,
      email,
      mobile,
      password,
      nid_number,
      photo,
      gender,

      // role: process.env.CUSTOMER_ROLE,
    };

    try {
      const res = await createUser(user).unwrap();

      if (res?.success) {
        reset();
        await dispatch(storeOTPData(res?.data));
        toast.success(res?.message || "Sing up is successful!", {
          position: toast.TOP_RIGHT,
        });

        router.push("/otp");
      }
      if (!res?.success) {
        toast.error(res?.message || "Something Went wrong!", {
          position: toast.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error(error?.data || "Something Went wrong!", {
        position: toast.TOP_RIGHT,
      });
    }
  };
  return (
    <div className="text-white h-lvh w-svw bg-black-solid grid place-items-center">
      <div className=" min-w-[700px] mx-auto bg-gray-800 rounded-lg p-6">
        <p className="border-0 border-b border-b-[#828282] pb-4">
          Sign Up Form
        </p>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="First Name"
              text="first_name"
              label="First Name"
              register={register}
              errors={errors}
            />

            <Input
              placeholder="Last Name"
              text="last_name"
              label="Last Name"
              register={register}
              errors={errors}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <SelectForm
              label="Select your gender"
              text="gender"
              register={register}
              errors={errors}
            >
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
              <option value={"others"}>Others</option>
            </SelectForm>

            <Input
              placeholder="Mobile Number"
              text="mobile"
              type="number"
              label="Mobile Number"
              register={register}
              errors={errors}
            />
          </div>
          <Input
            placeholder="Enter your email"
            text="email"
            type="email"
            label="Email"
            register={register}
            errors={errors}
          />
          <Input
            placeholder="Enter your nid_number"
            text="nid_number"
            type="number"
            label="Nid Number"
            register={register}
            errors={errors}
          />
          <Input
            placeholder="Enter your Photo"
            text="photo"
            label="Photo"
            register={register}
            errors={errors}
          />
          <Input
            placeholder="Enter your password"
            text="password"
            type="password"
            label="Password"
            register={register}
            pattern={pattern}
            errors={errors}
          />
          <Input
            placeholder="Enter your confirm password"
            text="confirmPassword"
            type="password"
            label="Confirm Password"
            register={register}
            pattern={pattern}
            errors={errors}
            validate={(value) =>
              value === watch("password") || "Passwords do not match"
            }
          />
          <button
            className="mt-4 p-2 text-sm rounded bg-info-base w-full cursor-pointer"
            type="submit"
          >
            {" "}
            {isLoading ? (
              <ImSpinner10 className="mx-auto w-5 h-5 animate-spin" />
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
