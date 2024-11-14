"use client";

import { useForgetPasswordMutation } from "@/redux/api/authApi";
import { storeUser } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Input from "../UI/Forms/Input";
import { storeOTPData } from "@/redux/features/otpSlice";
import { toast } from "react-toastify";
import { ImSpinner10 } from "react-icons/im";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // call forget password api
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  // handle input data function

  const onSubmit = async (data) => {
    try {
      const res = await forgetPassword(data).unwrap();

      if (res?.success) {
        reset();
        // save user info into redux state
        dispatch(storeOTPData(res?.data));

        toast.success("Success! Please check your email.", {
          position: toast.TOP_RIGHT,
        });
        router.push("/verify-otp");
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
    <div className="text-white bg-primary-base h-lvh w-lvw grid place-items-center">
      <div className="w-[556px] mx-auto bg-black-solid rounded-lg px-6 py-12">
        <p className=" border-0 border-b border-b-[#828282] pb-4">
          Forget Password Form
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Enter your email"
            text="email"
            type="email"
            label="Email"
            register={register}
            errors={errors}
          />

          <div className="text-center">
            <button
              className="mt-4 p-2 text-sm rounded bg-info-base w-full cursor-pointer"
              type="submit"
            >
              {" "}
              {isLoading ? (
                <ImSpinner10 className="mx-auto w-5 h-5 animate-spin" />
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
