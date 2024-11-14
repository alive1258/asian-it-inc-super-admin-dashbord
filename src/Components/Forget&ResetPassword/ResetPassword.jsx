"use client";

import Input from "@/components/UI/Forms/Input";
import {
  useResetPasswordMutation,
  useSignOutMutation,
} from "@/redux/api/authApi";
import { getUserinfo, removeUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ImSpinner10 } from "react-icons/im";

const ResetPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();

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

  const accessToken = getUserinfo();

  if (!accessToken) {
    router.push("/signin");
  }

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [signOut] = useSignOutMutation();

  const onSubmit = async (data) => {
    try {
      const res = await resetPassword({
        password: data?.password,
      }).unwrap();
      if (res?.success) {
        reset();
        removeUser();
        const logout = await signOut();
        console.log(logout);
        toast.success(res?.message || "Password reset successful!", {
          position: toast.TOP_RIGHT,
        });
        router.push("/signin");
      }
      if (!res?.success) {
        toast.error(res?.message || "Something Went wrong!", {
          position: toast.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error(error?.message || "Something Went wrong!", {
        position: toast.TOP_RIGHT,
      });
    }
  };
  return (
    <div className="text-white bg-black-solid h-lvh w-svw grid place-items-center">
      <div className="md:w-[600px] max-w-[650px] mx-auto bg-gray-800 rounded-lg p-6">
        <p className="border-0 border-b border-b-[#828282] pb-4">
          Reset Your Password
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Enter your new password"
              text="password"
              type="password"
              label="New Password"
              register={register}
              pattern={pattern}
              errors={errors}
            />
            <Input
              placeholder="Re-enter your confirm password"
              text="confirmPassword"
              type="password"
              label="Re-Enter"
              register={register}
              pattern={pattern}
              errors={errors}
              validate={(value) =>
                value === watch("password") || "Passwords do not match"
              }
            />
          </div>
          <button
            className="mt-4 p-2 text-sm rounded bg-info-base w-full cursor-pointer"
            type="submit"
          >
            {" "}
            {isLoading ? (
              <ImSpinner10 className="mx-auto w-5 h-5 animate-spin" />
            ) : (
              <span>Reset Password</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
