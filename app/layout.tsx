import type { Metadata } from "next";
import { Kantumruy_Pro } from "next/font/google";
import "./globals.css";


const kantumruy = Kantumruy_Pro({
  subsets: ["khmer"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "AI ជំនួយការចុងភៅ",
  description: "បង្កើតមុខម្ហូបដោយគ្រាន់តែបញ្ចូលឈ្មោះនៃមុខម្ហូប",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kantumruy.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
