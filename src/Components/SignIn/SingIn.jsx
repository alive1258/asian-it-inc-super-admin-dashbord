"use client";

import { useForm } from "react-hook-form";
import Input from "../UI/Forms/Input";
import Link from "next/link";
import { useSignInMutation } from "@/redux/api/authApi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ImSpinner10 } from "react-icons/im";

const SingIn = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [signIn, { isLoading }] = useSignInMutation();

  const onSubmit = async (data) => {
    try {
      const res = await signIn(data).unwrap();

      if (res?.success) {
        reset();
        window.location.reload('/');
        toast.success(res?.message || "Singed is successful!", {
          position: toast.TOP_RIGHT,
        });
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
    <div className="text-white flex items-center justify-center h-screen bg-[#021526]">
      <div className=" px-6">
        <div className="md:w-[556px] w-[350px]  mx-auto bg-gray-800   px-6 py-12 relative rounded-xl overflow-hidden shadow-xl">
          <div className="absolute  top-0 left-0 w-full h-[4px] bg-gradient-to-r from-violet-600  to-[#e4365e]"></div>

          <div>
            <p className="text-xl font-semibold border-0 border-b border-b-[#828282] pb-4">
              Sign In Form
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
              <Input
                type="password"
                placeholder="Enter your password"
                text="password"
                label="Password"
                register={register}
                errors={errors}
              />
              <div className="flex items-center justify-end mt-3 px-[1px]">
                {/* <div className="flex items-center gap-2">
              <input className="text-2xl size-4" type="checkbox" />
              <span className="text-sm font-light">Remember me</span>
            </div> */}
                <Link
                  className="text-[16px] text-info-base font-semibold"
                  href="/dashboard/forms/forget-password"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="text-center">
                <button
                  className="mt-4 btn w-full cursor-pointer"
                  type="submit"
                >
                  {" "}
                  {isLoading ? (
                    <ImSpinner10 className="mx-auto w-5 h-5 animate-spin" />
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="pt-6">
            <div>
              <p>
                Do not have an account yet ?{" "}
                <span className="text-info-base text-[16px] font-semibold">
                  <Link href="/sign-up">Sign up here</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingIn;
