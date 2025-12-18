import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/molecules/navbar";
import "./globals.css";
import Script from "next/script";
import { AuthProvider } from "./api/auth/AuthContext";
import FooterWrapper from './components/molecules/FooterWrapper';

export const metadata = {
  title: "My Next.js App",
  description: "Awesome app built with Next.js",
  icons: {
    icon: "/fav-icon/icon.jpeg",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <Navbar />
          {children}
          <FooterWrapper /> {/* ✅ Footer hidden on Admin */}
        </AuthProvider>
      </body>
    </html>
  );
}

// // layout.js
// import { Geist, Geist_Mono } from "next/font/google";
// import Navbar from "./components/molecules/navbar";
// import "./globals.css";
// import Footer from "./components/molecules/footer";
// import Script from "next/script";
// import { AuthProvider } from "./api/auth/AuthContext";

// // ✅ Metadata with favicon
// export const metadata = {
//   title: "My Next.js App",
//   description: "Awesome app built with Next.js",
//   icons: {
//     icon: "/fav-icon/icon.jpeg", // favicon path
//   },
// };

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         <Script
//           src="https://accounts.google.com/gsi/client"
//           strategy="beforeInteractive"
//         />
//       </head>
//       <body className={`${geistSans.variable} ${geistMono.variable}`}>
//         <AuthProvider>
//           <Navbar />
//           {children}
//           <Footer />
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }
