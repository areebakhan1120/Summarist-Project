"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../AuthContext";
import Modal from "@/app/Components/Modal";
import { useState } from "react";

export default function AuthModal() {
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();

  const bookId = params.get("bookId");
  const title = params.get("title");
     const [open, setOpen] = useState(false);

  const handleLogin = async (data: { email: string; password: string }) => {
    await login();
    setOpen(false);
  };


  return (
 <div className="flex flex-col gap-4 items-center justify-center py-10">
  <img src="/login.png" alt="Login to read"     className="w-350px h-auto" />

  <div className="text-[#032b41] font-semibold text-[32px] text-center">
    Log in to your account to read and listen to the book
  </div>
 <div className="flex justify-center w-full mt-4">
                  <button
                   onClick={() => setOpen(true)}
                    style={{ width: "300px" }}
                    className="flex items-center justify-center h-10 bg-[#2bd97c] text-[#032b41] text-base font-medium rounded-sm transition-colors hover:bg-[#20ba68]"
                  >
                    Login
                  </button>
                     <Modal isOpen={open} onClose={() => setOpen(false)} onSubmit={handleLogin} />
  </div>
</div>
  );
}
