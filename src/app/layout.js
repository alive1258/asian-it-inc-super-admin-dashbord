import { Poppins } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import Providers from "@/lib/Providers/Providers";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Asian it inc",
  description: "Asian it inc admin dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`poppins.className bg-[#131517]`}>
        <NextTopLoader
          showSpinner={false}
          //   color="#2299DD"
          //   initialPosition={0.08}
          //   crawlSpeed={200}
          //   height={3}
          //   crawl={true}
          //   easing="ease"
          //   speed={200}
          //   shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          //   template='<div class="bar" role="bar"><div class="peg"></div></div>
          // <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          //   zIndex={1600}
          //   showAtBottom={false}
        />
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
