"use client";

const SelectForm = ({ label, text, register, errors, required = false, children }) => {
  return (
    <div className="space-y-1 text-[#ADB5BD]">
      {/* input label */}
      <label className="text-sm text-white">
        {label}
        {required && (
          <abbr className="pl-1 text-lg text-[#FF4234]">
            *
          </abbr>
        )}
      </label>
      <select
        className="w-full h-10 rounded-lg border-[1.5px] border-stroke px-5 outline-none transition focus:border-info-base active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input text-black dark:focus:border-primary bg-black-muted max-h-[100px] overflow-y-auto"
        {...register(text, {
          required: required ? `${label} is required` : false,
        })}
      >
        {children}
      </select>
      {errors?.[text] && (
        <span className="text-red-600 text-sm">{errors[text]?.message}</span>
      )}
    </div>
  );
};

export default SelectForm;
