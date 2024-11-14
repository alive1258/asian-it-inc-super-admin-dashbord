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
    Icon: <MdOutlineDashboard size={24} />,
  },
  {
    id: 2,
    name: "Services",
    path: "/services/",
    Icon: <FaServicestack size={24} />,
  },
  {
    id: 3,
    name: "Services marquee",
    path: "/service-marquee",
    Icon: <FaServicestack size={24} />,
  },
  {
    id: 4,
    name: "Why trust us",
    path: "/why-trust-us",
    Icon: <MdOutlineDonutSmall size={24} />,
  },
  {
    id: 5,
    name: "Brands",
    path: "/brands",
    Icon: <SiBrandfolder size={24} />,
  },
  {
    id: 6,
    name: "Our Team",
    path: "/teams",
    Icon: <TiGroupOutline size={24} />,
  },
  {
    id: 7,
    name: "Countries",
    path: "/countries/all-countries",
    Icon: <MdAccountBalanceWallet size={24} />,
  },

  {
    id: 8,
    name: "Smtp",
    path: "/smtp/all-smtps",
    Icon: <MdOutlineDonutSmall size={24} />,
  },
  {
    id: 9,
    name: "CashBooks",
    path: "/cashbooks/all-cashbooks",
    Icon: <CiBasketball sizCiCompass1e={24} />,
  },
  {
    id: 10,
    name: "Banks",
    path: "",
    Icon: <RiBankFill size={24} />,
    sub: [
      {
        id: 1,
        name: "Bank",
        path: "/banks/all-banks",
        Icon: <IoPersonAddSharp />,
      },
      {
        id: 2,
        name: "Bank balances",
        path: "/bank-balances/all-bank-balances",
        Icon: <IoPersonAddSharp />,
      },
      {
        id: 3,
        name: "Mobile Banks",
        path: "/mobile-banks/all-mobile-banks",
        Icon: <MdManageAccounts />,
      },
      {
        id: 4,
        name: "Mobile Bank Accounts",
        path: "/mobile-bank-accounts/all-mobile-bank-accounts",
        Icon: <MdManageAccounts />,
      },
      {
        id: 5,
        name: "Mobile Bank Balances",
        path: "/mobile-bank-balances/all-mobile-bank-balances",
        Icon: <MdCoPresent />,
      },
    ],
  },
  {
    id: 11,
    name: "Product Categories",
    path: "",
    Icon: <RiBankFill size={24} />,
    sub: [
      {
        id: 1,
        name: "All Category",
        path: "/categories/all-categories",
        Icon: <IoPersonAddSharp />,
      },
      {
        id: 2,
        name: "Sub Category",
        path: "/sub-categories/all-sub-categories",
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
    name: "Relations",
    path: "/relations/all-relations",
    Icon: <MdOutlinePermMedia size={24} />,
  },
  {
    id: 13,
    name: "Units",
    path: "/units/all-units",
    Icon: <CiCompass1 sizCiCompass1e={24} />,
  },
  {
    id: 14,
    name: "Attributes",
    path: "/attributes/all-attributes",
    Icon: <GiVerticalBanner sizCiCompass1e={24} />,
  },
  {
    id: 15,
    name: "Stock Types",
    path: "/stock-types/all-stock-types",
    Icon: <SiJetpackcompose sizCiCompass1e={24} />,
  },
  {
    id: 16,
    name: "Suppliers",
    path: "/suppliers/all-suppliers",
    Icon: <FaFeather sizCiCompass1e={24} />,
  },
  {
    id: 17,
    name: "Discount Types",
    path: "/discount-types/all-discount-types",
    Icon: <MdDiscount sizCiCompass1e={24} />,
  },
  {
    id: 18,
    name: "Payment Methods",
    path: "/payment-methods/all-payment-methods",
    Icon: <BsFillFileEarmarkRuledFill sizCiCompass1e={24} />,
  },
  {
    id: 19,
    name: "Products",
    path: "/products/all-products",
    Icon: <FaProductHunt sizCiCompass1e={24} />,
  },
  {
    id: 20,
    name: "Stocks",
    path: "/stocks/all-stocks",
    Icon: <CgShutterstock sizCiCompass1e={24} />,
  },
  {
    id: 21,
    name: "Product Transfers",
    path: "/product-transfers/all-product-transfers",
    Icon: <MdManageHistory sizCiCompass1e={24} />,
  },
  {
    id: 22,
    name: "Variants",
    path: "/variants/all-variants",
    Icon: <MdOutlineDonutSmall size={24} />,
  },
  {
    id: 23,
    name: "Variant Prices",
    path: "/variant-prices/all-variant-prices",
    Icon: <AiOutlineStock sizCiCompass1e={24} />,
  },
  {
    id: 23,
    name: "Assigned Variants",
    path: "/assigned-variants/all-assigned-variants",
    Icon: <FaServicestack sizCiCompass1e={24} />,
  },
  {
    id: 24,
    name: "Investors",
    path: "/investors/all-investors",
    Icon: <TbBrandAirbnb sizCiCompass1e={24} />,
  },
  {
    id: 25,
    name: "Discount Types",
    path: "/discount-types/all-discount-types",
    Icon: <MdOutlineCategory sizCiCompass1e={24} />,
  },
  {
    id: 26,
    name: "Purchases",
    path: "/purchases/all-purchases",
    Icon: <FaDelicious sizCiCompass1e={24} />,
  },
];
