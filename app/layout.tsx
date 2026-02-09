"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideNav from "./for-you/SideNav";
import SearchBar from "./for-you/SearchBar";
import { usePathname } from "next/navigation";
import { LibraryProvider } from "./Components/LibraryContext";
import { AuthProvider } from "./Auth/AuthContext";
import { FontSizeProvider } from "./context/FontSizeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Only show SideNav and SearchBar on certain routes
  const showSidebarAndSearch = pathname.startsWith("/for-you") || pathname.startsWith("/book") || pathname.startsWith("/library") || pathname.startsWith("/settings") || pathname.startsWith("/player");

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}>
        <AuthProvider>
          <FontSizeProvider>
            <LibraryProvider>
              {showSidebarAndSearch && <SideNav />}
              <div
                className={`flex-1 flex flex-col transition-all duration-300 ${
                  showSidebarAndSearch ? "lg:ml-[200px]" : ""
                }`}
              >
               {showSidebarAndSearch && <SearchBar />}
                <main className="flex-1 flex flex-col transition-all duration-300">
                  {children}
                </main>
              </div>
            </LibraryProvider>
          </FontSizeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
