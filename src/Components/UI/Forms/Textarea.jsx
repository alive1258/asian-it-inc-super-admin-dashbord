"use client";

const Textarea = ({ label, text, placeholder,require, register, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-white">{label}</label>
      <textarea
        className="w-full h-[157px] text-xs text-white focus:border focus:border-info-base p-2 pt-1 bg-[#131517] text-[#fff]/50 rounded focus:outline-none placeholder:text-[#B9BABB] placeholder:text-xs"
        placeholder={placeholder}
        {...register(text,{ required: require })}
      />
      <div className="h-3">
        {errors[text] && (
          <p role="alert" className="  text-danger-base text-xs ">
            {errors[text]?.message || `${placeholder} is required`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Textarea;
