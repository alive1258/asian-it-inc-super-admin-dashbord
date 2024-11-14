"use client";
const Form = ({ onSubmit, children }) => {
  return (
    <form className="mt-8" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
