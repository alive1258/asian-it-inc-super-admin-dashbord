"use client";
import { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Select = ({
  label,
  text,
  placeholder,
  options = [],
  defaultValue,
  require = true,
  errors,
  register,
  selectedOption,
  setSelectedOption, // Accept register function
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Filter options based on search term
  const filteredOptions = options?.filter((option) =>
    option?.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (defaultValue && options?.length) {
      const option = options?.find((opt) => opt?.value === defaultValue);
      setSelectedOption(option || null);
    }
  }, [defaultValue, options, setSelectedOption]);

  // Use register to bind select value
  useEffect(() => {
    if (selectedOption && register) {
      console.log(selectedOption);
      register(text, {
        value: selectedOption?.value
          ? selectedOption.value
          : selectedOption?.id,
      });
    }
  }, [selectedOption, register, text]);

  return (
    <div className="space-y-1 relative">
      {label && (
        <label className="text-[16px] text-white">
          {label}
          <abbr
            className={`${require ? "" : "hidden"} pl-1 text-lg text-[#FF4234]`}
          >
            *
          </abbr>
        </label>
      )}
      <div
        className="w-full h-10 p-2 bg-[#131517] text-[#fff] rounded flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[14px] placeholder-white">
          {selectedOption
            ? selectedOption?.label || selectedOption?.name
            : placeholder || "Select an option..."}
        </span>
        <IoMdArrowDropdown className="text-base text-secondary-base pointer-events-none" />
      </div>
      {isOpen && (
        <div className="absolute top-[74px] w-full bg-[#131517] rounded shadow-md max-h-40 overflow-y-scroll z-10">
          <input
            type="text"
            className="w-full h-10 p-2 bg-[#1A1C1E] text-white rounded-t focus:outline-none"
            placeholder="Search for..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredOptions?.length > 0 ? (
            filteredOptions?.map((option, index) => (
              <div
                key={index}
                className="py-2 px-3   text-white hover:bg-info-base cursor-pointer"
                onClick={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                }}
              >
                {option?.label ? option?.label : option?.name}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-red-500">No results found</div>
          )}
        </div>
      )}
      <div className="h-3">
        {errors && errors[text] && (
          <p role="alert" className="text-danger-base text-xs">
            {errors[text]?.message || `${placeholder} is required`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Select;
