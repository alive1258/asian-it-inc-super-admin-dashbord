const Footer = () => {
  const fullYear = new Date().getFullYear();
  return (
    <>
      <div className="bg-primary-base w-full p-4  text-center border-l border-l-[#131517]">
        <p className="text-[10px] md:text-sm text-secondary-base">
          &copy; Copyrights <span className="text-white">School</span>{" "}
          {fullYear}. All right reserved. Designed by{" "}
          <span className="text-[#0064F7]">ASIAN IT INC</span>
        </p>
      </div>
    </>
  );
};

export default Footer;
