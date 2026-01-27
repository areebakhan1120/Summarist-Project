"use client";

import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogin, MdLogout } from "react-icons/md";
import { RiBallPenLine } from "react-icons/ri";
import Modal from "../Components/Modal";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../Auth/AuthContext";
import { useFontSize } from "../context/FontSizeContext";

export default function SideNav() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();
  const router = useRouter();

  interface Tab {
    name: string;
    icon: React.ReactNode;
    href: string;
    disabled?: boolean;
  }

  const tabs = [
    { name: "For You", icon: <AiOutlineHome size={24} />, href: "/for-you" },
    { name: "My Library", icon: <BsBookmark size={24} />, href: "/library" },
    {
      name: "Highlights",
      icon: <RiBallPenLine size={24} />,
      href: "#",
      disabled: true,
    },
    {
      name: "Search",
      icon: <AiOutlineSearch size={24} />,
      href: "#",
      disabled: true,
    },
  ];

  const bottomTabs = [
    {
      name: "Settings",
      icon: <IoSettingsOutline size={24} />,
      href: "/settings",
    },
    {
      name: "Help & Support",
      icon: <IoMdHelpCircleOutline size={24} />,
      href: "#",
      disabled: true,
    },
    isLoggedIn
      ? { name: "Logout", icon: <MdLogout size={24} />, href: "#" }
      : { name: "Login", icon: <MdLogin size={24} />, href: "#" },
  ];
const renderTab = (tab: Tab) => (
  <a
    key={tab.name}
    href={tab.href}
    onClick={(e) => {
      if (tab.name === "Login") {
        e.preventDefault();
        setOpen(true);
        return;
      }

      if (tab.name === "Logout") {
        e.preventDefault();
        handleLogout();
        return;
      }
    }}
    className={`
      group flex h-[64px] mb-3 rounded transition-colors duration-300
      items-center lg:items-center
      justify-center lg:justify-start
      text-center lg:text-left
      px-4
      ${
        tab.disabled
          ? "cursor-not-allowed"
          : "cursor-pointer hover:bg-gray-200"
      }
    `}
  >
    <div
      className="
        flex flex-row lg:flex-row
        items-center
        gap-1 lg:gap-3
      "
    >
      <div className="flex items-center justify-center">
        {tab.icon}
      </div>

      <div className="text-sm lg:text-base">
        {tab.name}
      </div>
    </div>
  </a>
);


  async function handleLogin(data: {
    email: string;
    password: string;
    remember?: boolean;
  }) {
    await new Promise((r) => setTimeout(r, 700));

    login();
    setOpen(false);
    router.push("/for-you");
  }

  function handleLogout() {
    logout();
    router.push("/Auth/AuthModal");
  }

  const { fontSize, setFontSize } = useFontSize();
  const pathname = usePathname();
  const sizes = ["text-base", "text-lg", "text-xl", "text-2xl"] as const;
  
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
     {/* Hamburger Button */}
<div className="fixed top-6 right-6 z-[2000] lg:hidden">
  <button
    onClick={() => setMobileOpen(!mobileOpen)} // toggle instead of always true
    className="p-2 bg-white rounded-md shadow-md text-[#032b41]"
  >
    <FaBars size={24} />
  </button>
</div>

{/* Overlay */}
{mobileOpen && (
  <div
    className="fixed inset-0 bg-black/70 z-[1000] lg:hidden"
    onClick={() => setMobileOpen(false)}
  />
)}

{/* Sidebar */}
<div
  className={`
    bg-[#f7faf9]
    fixed top-0 left-0 h-screen z-[2000]
    transition-transform duration-300
    w-[260px] lg:w-[200px]      /* smaller width on desktop, bigger on mobile */
    ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
    lg:translate-x-0
  `}
>
  <div className="flex items-center justify-center h-[60px] pt-4 max-w-[160px] mx-auto">
    <img src="/logo.png" alt="Logo" />
  </div>

  <div className="flex flex-col justify-between h-[calc(100vh-60px)] pb-5 overflow-y-auto">
    <div className="flex-1 mt-10">
      {tabs.map(renderTab)}

      {pathname.startsWith("/player") && (
        <div className="mb-4 px-4">
          <div className="text-[#032b41] text-sm font-semibold mb-2">
            Font Size
          </div>
          <div className="flex justify-between items-center border-t border-[#e1e7ea] pt-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`
                  ${size} pb-1 !border-b-2 transition-colors duration-200 text-[#032b41]
                  ${fontSize === size
                    ? "!border-[#2bd97c]"
                    : "!border-transparent hover:!border-[#2bd97c]"
                  }
                `}
              >
                Aa
              </button>
            ))}
          </div>
        </div>
      )}
    </div>

    <div className="sidebar__bottom">{bottomTabs.map(renderTab)}</div>
  </div>

  <Modal
    isOpen={open}
    onClose={() => setOpen(false)}
    onSubmit={handleLogin}
  />
</div>

    </>
  );
}
