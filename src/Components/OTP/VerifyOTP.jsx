"use client";

import Input from "../UI/Forms/Input";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { storeUserInfo } from "@/services/auth.service";
import { removeOTPData } from "@/redux/features/otpSlice";
import ResendOTP from "./ResendOTP";
import { useVerifyOTPMutation } from "@/redux/api/authApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ImSpinner10 } from "react-icons/im";

const VerifyOTP = ({ redirectPath }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { otpData } = useSelector((state) => state.otpTree);
  const added_by = otpData?.added_by;

  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();

  const onSubmit = async (data) => {
    try {
      const res = await verifyOTP({
        user_id: added_by,
        otp_code: data.otp_code,
      }).unwrap();

      if (res?.success) {
        reset();
        router.push(redirectPath);

        toast.success("Singed is successful!", {
          position: toast.TOP_RIGHT,
        });

        dispatch(removeOTPData());
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
    <div className="text-white bg-primary-base h-lvh w-lvw grid place-items-center">
      <div className="w-[556px] mx-auto bg-black-solid rounded-lg px-6 py-12">
        <p className="border-0 border-b border-b-[#828282] pb-4">OTP Form</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Enter The OTP"
            text="otp_code"
            type="string"
            label="OTP"
            register={register}
            errors={errors}
          />

          <div className="text-center">
            <button
              className="mt-4 p-2 text-sm rounded bg-info-base w-full cursor-pointer"
              type="submit"
            >
              {isLoading ? (
                <ImSpinner10 className="mx-auto w-5 h-5 animate-spin" />
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
        </form>
        <ResendOTP />
      </div>
    </div>
  );
};

export default VerifyOTP;
