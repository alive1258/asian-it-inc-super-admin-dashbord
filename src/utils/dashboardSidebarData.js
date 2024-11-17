import { AiOutlineStock } from "react-icons/ai";
import {
  MdAccountBalanceWallet,
  MdManageHistory,
  MdOutlineDonutSmall,
} from "react-icons/md";
import { CgShutterstock } from "react-icons/cg";
import { FaProductHunt } from "react-icons/fa";
import { CiBasketball } from "react-icons/ci";
import { FaServicestack, FaUsers } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";
import { TbBrandAirbnb, TbBrandAlipay } from "react-icons/tb";
import { MdOutlinePermMedia } from "react-icons/md";
import { FaDelicious } from "react-icons/fa";
import { SiBrandfolder, SiPrivatedivision } from "react-icons/si";
import { CiCompass1 } from "react-icons/ci";
import { BsFillFileEarmarkRuledFill } from "react-icons/bs";
import { GiVerticalBanner } from "react-icons/gi";
import { FaFeather } from "react-icons/fa";
import { SiJetpackcompose } from "react-icons/si";
import { MdDiscount } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { MdCoPresent } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { RiBankFill } from "react-icons/ri";
import { TiGroupOutline } from "react-icons/ti";

export const privateRouteNames = [
  "Services",
  "Category",
  "Delivery",
  "Customer",
  "Users",
  "Company rules",
  "Company names",
  "Banners",
];

export const SidebarItemsData = [
  {
    id: 1,
    name: "dashboard",
    path: "/",
    Icon: <MdOutlineDashboard size={18} />,
  },
  {
    id: 2,
    name: "Services",
    path: "/services/",
    Icon: <FaServicestack size={18} />,
  },
  {
    id: 3,
    name: "Services marquee",
    path: "/service-marquee",
    Icon: <FaServicestack size={18} />,
  },
  {
    id: 4,
    name: "Why trust us",
    path: "/why-trust-us",
    Icon: <MdOutlineDonutSmall size={18} />,
  },
  {
    id: 5,
    name: "Brands",
    path: "/brands",
    Icon: <SiBrandfolder size={18} />,
  },
  {
    id: 6,
    name: "Our Team",
    path: "/teams",
    Icon: <TiGroupOutline size={18} />,
  },
  {
    id: 7,
    name: "Our Works",
    path: "/our-works",
    Icon: <MdAccountBalanceWallet size={18} />,
  },

  {
    id: 8,
    name: "Technologies",
    path: "/technologies",
    Icon: <MdOutlineDonutSmall size={18} />,
  },
  {
    id: 9,
    name: "Capabilities",
    path: "/capabilities",
    Icon: <CiBasketball size={18} />,
  },

  {
    id: 10,
    name: "Industries",
    path: "/industries",
    Icon: <CiBasketball size={18} />,
  },

  {
    id: 11,
    name: "Products",
    path: "",
    Icon: <RiBankFill size={18} />,
    sub: [
      {
        id: 1,
        name: "Our Product Price ",
        path: "/products/our-product-price",
        Icon: <IoPersonAddSharp />,
      },
      {
        id: 2,
        name: "Products",
        path: "/products/products",
        Icon: <MdManageAccounts />,
      },
      {
        id: 3,
        name: "Tertiary Category",
        path: "/tertiary-categories/all-tertiary-categories",
        Icon: <MdCoPresent />,
      },
    ],
  },

  {
    id: 12,
    name: "Faqs",
    path: "",
    Icon: <RiBankFill size={18} />,
    sub: [
      {
        id: 1,
        name: "Faqs Category ",
        path: "/faqs/faqs-category",
        Icon: <IoPersonAddSharp />,
      },
      {
        id: 2,
        name: "Faqs",
        path: "/faqs/faqs",
        Icon: <MdManageAccounts />,
      },
      {
        id: 3,
        name: "Tertiary Category",
        path: "/tertiary-categories/all-tertiary-categories",
        Icon: <MdCoPresent />,
      },
    ],
  },

  {
    id: 13,
    name: "Units",
    path: "/units/all-units",
    Icon: <CiCompass1 size={18} />,
  },
  {
    id: 14,
    name: "Attributes",
    path: "/attributes/all-attributes",
    Icon: <GiVerticalBanner size={18} />,
  },
  {
    id: 15,
    name: "Stock Types",
    path: "/stock-types/all-stock-types",
    Icon: <SiJetpackcompose size={18} />,
  },
  {
    id: 16,
    name: "Suppliers",
    path: "/suppliers/all-suppliers",
    Icon: <FaFeather size={18} />,
  },
  {
    id: 17,
    name: "Discount Types",
    path: "/discount-types/all-discount-types",
    Icon: <MdDiscount size={18} />,
  },
  {
    id: 18,
    name: "Payment Methods",
    path: "/payment-methods/all-payment-methods",
    Icon: <BsFillFileEarmarkRuledFill size={18} />,
  },
  {
    id: 19,
    name: "Products",
    path: "/products/all-products",
    Icon: <FaProductHunt size={18} />,
  },
  {
    id: 20,
    name: "Stocks",
    path: "/stocks/all-stocks",
    Icon: <CgShutterstock size={18} />,
  },
  {
    id: 21,
    name: "Product Transfers",
    path: "/product-transfers/all-product-transfers",
    Icon: <MdManageHistory size={18} />,
  },
  {
    id: 22,
    name: "Variants",
    path: "/variants/all-variants",
    Icon: <MdOutlineDonutSmall size={18} />,
  },
  {
    id: 23,
    name: "Variant Prices",
    path: "/variant-prices/all-variant-prices",
    Icon: <AiOutlineStock size={18} />,
  },
  {
    id: 23,
    name: "Assigned Variants",
    path: "/assigned-variants/all-assigned-variants",
    Icon: <FaServicestack size={18} />,
  },
  {
    id: 24,
    name: "Investors",
    path: "/investors/all-investors",
    Icon: <TbBrandAirbnb size={18} />,
  },
  {
    id: 25,
    name: "Discount Types",
    path: "/discount-types/all-discount-types",
    Icon: <MdOutlineCategory size={18} />,
  },
  {
    id: 26,
    name: "Purchases",
    path: "/purchases/all-purchases",
    Icon: <FaDelicious size={18} />,
  },
];
