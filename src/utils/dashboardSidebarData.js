import { MdAccountBalanceWallet, MdOutlineDonutSmall } from "react-icons/md";

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
    path: "/product",
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
        name: "Product top category",
        path: "/products/product-top-category",
        Icon: <MdManageAccounts />,
      },
      {
        id: 4,
        name: "Assigned technology",
        path: "/products/assigned-technology",
        Icon: <MdManageAccounts />,
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
    ],
  },

  {
    id: 13,
    name: "Settings",
    path: "/settings",
    Icon: <RiBankFill size={18} />,
    sub: [
      {
        id: 1,
        name: "Terms and conditions",
        path: "/settings/terms-and-conditions",
        Icon: <IoPersonAddSharp />,
      },
      {
        id: 2,
        name: "Privacy And policy",
        path: "/settings/privacy-policy",
        Icon: <MdManageAccounts />,
      },
    ],
  },

  {
    id: 14,
    name: "Banners",
    path: "/banners",
    Icon: <RiBankFill size={18} />,
    sub: [
      {
        id: 1,
        name: "Home Page Banners",
        path: "/banners/home-banners",
        Icon: <IoPersonAddSharp />,
      },
      {
        id: 2,
        name: "Others Page banners",
        path: "/banners/others-page-banners",
        Icon: <MdManageAccounts />,
      },
    ],
  },

  {
    id: 15,
    name: "Testimonial",
    path: "/testimonial",
    Icon: <SiJetpackcompose size={18} />,
  },
  {
    id: 16,
    name: "About",
    path: "/about",
    Icon: <FaFeather size={18} />,
  },
  {
    id: 17,
    name: "Blogs",
    path: "/Blogs",
    Icon: <RiBankFill size={18} />,
    sub: [
      {
        id: 1,
        name: "Blogs Categories",
        path: "/blogs/blogs-category",
        Icon: <IoPersonAddSharp />,
      },
      {
        id: 2,
        name: "Blogs",
        path: "/blogs/blogs",
        Icon: <MdManageAccounts />,
      },
    ],
  },
];
