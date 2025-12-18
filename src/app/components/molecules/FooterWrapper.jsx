"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // ❌ Hide footer on Admin routes
  if (pathname.startsWith("/Admin")) {
    return null;
  }

  return <Footer />;
}
