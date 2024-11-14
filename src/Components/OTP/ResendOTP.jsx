import { useResendOTPMutation } from "@/redux/api/authApi";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { removeOTPData, storeOTPData } from "@/redux/features/otpSlice";
import React, { useEffect, useState } from "react";
import { ImSpinner10 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ResendOTP = () => {
  const dispatch = useDispatch();
  const [OTPTime, setOTPTime] = useState(59);
  const [count, setCount] = useState(false);

  const { otpData } = useSelector((state) => state?.otpTree);

  const added_by = otpData?.added_by;

  const { data } = useGetSingleUserQuery(added_by);
  const email = data?.data?.email;

  const [resendOTPVerification, { isLoading }] = useResendOTPMutation();

  useEffect(() => {
    //get expiresAt from redux
    const expiresAt = otpData?.expire_at;

    // get current date
    const currentDate = new Date();
    // converts the expiresAt into date
    const expirationDate = new Date(expiresAt);

    // calculate the difference time in millisecond
    const differenceInMilliseconds =
      Number(expirationDate) - Number(currentDate);

    // convert time in second
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

    // set the time in useState
    setOTPTime(differenceInSeconds);
  }, [otpData]);

  useEffect(() => {
    if (OTPTime <= 0) return;

    const availableTime = setInterval(() => setOTPTime(OTPTime - 1), 1000);

    return () => clearInterval(availableTime);
  }, [OTPTime]);

  // handle resend otp function
  const handleResendOTP = async () => {
    const data = {
      userId: added_by,
      email,
    };
    try {
      const res = await resendOTPVerification(data).unwrap();

      if (res?.success) {
        dispatch(storeOTPData(res.data));
        // start count
        setCount(!count);
        //set time count
        setOTPTime(59);
        toast.success(res?.message || "OTP Re-sended successfully!", {
          position: toast.TOP_RIGHT,
        });
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
    <div className="flex justify-between  mt-5 items-center text-center">
      <button
        disabled
        className="bg-white text-gray-800 font-semibold py-2 px-5 min-w-20 rounded-md"
      >
        {OTPTime}
      </button>

      <button
        disabled={OTPTime > 0 && true}
        onClick={handleResendOTP}
        className="py-2 px-4 text-sm rounded bg-warning-base w-40 cursor-pointer"
        type="submit"
      >
        {isLoading ? (
          <ImSpinner10 className="mx-auto w-5 h-5 animate-spin" />
        ) : (
          <span>Reset Password</span>
        )}
      </button>
    </div>
  );
};

export default ResendOTP;