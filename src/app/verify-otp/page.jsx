import VerifyOTP from "@/Components/OTP/VerifyOTP";

const VerifyOTPPage = () => {
  return (
    <>
      <VerifyOTP redirectPath={"/reset-password"} />
    </>
  );
};

export default VerifyOTPPage;
