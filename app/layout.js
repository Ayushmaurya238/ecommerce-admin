import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});


export const metadata = {
  title: "eComAdmin",
  description: "Administrative panel for e-commerce sellers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"> */}
      <body
        className={inter.className}
      >
        {children}
      </body>
      {/* </div></div> */}


    </html>
  );
}
