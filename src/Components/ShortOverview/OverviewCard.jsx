import polygon from "../../app/assets/images/Polygon 1.png";
import icon from "../../../public/assets/images/Frame.png";
import Image from "next/image";

const OverviewCard = () => {
  return (
    <>
      <div className="bg-primary-base rounded-lg pl-5 pr-6 py-2.5 flex items-center justify-between">
        <div
          className="size-16 bg-no-repeat bg-cover flex items-center justify-center"
          style={{
            backgroundImage: "url(/assets/images/Polygon.png)",
          }}
        >
          <Image src={icon} width={32} height={32} alt="icon" />
        </div>
        <div className="flex flex-col items-end">
          <p className="text-secondary-base">Total Students</p>
          <h1 className="text-2xl text-primary-muted font-semibold">3800</h1>
        </div>
      </div>
    </>
  );
};

export default OverviewCard;
