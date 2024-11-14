const SubmitButton = ({ text }) => {
  return (
    <>
      <button
        type="submit"
        className="w-full bg-[#3A57E8] text-[#fff] font-medium py-2 px-4 mt-6 rounded"
      >
        {text}
      </button>
    </>
  );
};

export default SubmitButton;
