"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  label,
  type = "text",
  text,
  placeholder,
  register,
  errors,
  pattern,
  value,
  validate,
  onChange,
  require = true,
}) => {
  const [inputType, setInputType] = useState(type);
  const [showPass, setShowPass] = useState(false);

  const handleShowPassword = (type) => {
    setShowPass(!showPass);
    setInputType(type);
  };
  return (
    <div className="space-y-1">
      {/* input label   */}
      <label className="text-[16px] text-white">
        {label}
        <abbr
          className={`${require ? " " : "hidden"} pl-1  text-lg text-[#FF4234]`}
        >
          *
        </abbr>
      </label>
      {/* input  */}
      <div className="relative">
        <input
          className="w-full h-12 focus:bg-none  focus:border focus:border-info-base  bg-[#131517] text-[#fff]/50 rounded focus:outline-none p-2 text-white text-[15px] placeholder:text-[#B9BABB] placeholder:text-sm"
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...(register
            ? register(text, {
                required: require ? `${label} is required` : false,
                pattern: pattern,
                validate: validate,
              })
            : {})}
        />
        {/* for password  */}
        {type === "password" &&
          (showPass ? (
            <FaEye
              onClick={() => handleShowPassword("password")}
              className="text-white absolute right-2 top-0 mt-3 cursor-pointer"
            />
          ) : (
            <FaEyeSlash
              onClick={() => handleShowPassword("text")}
              className="text-white absolute right-2 top-0 mt-3 cursor-pointer"
            />
          ))}
      </div>
      {/* error message  */}
      <div className="">
        {errors?.[text] && (
          <p role="alert" className="text-danger-base text-xs ">
            {errors[text]?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
