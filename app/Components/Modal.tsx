"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useAuth } from "../Auth/AuthContext";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { initFirebase } from "./firebase/firebase";

interface LoginData {
  email: string;
  password: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: LoginData) => Promise<void>;
}

export default function Modal({ isOpen, onClose, onSubmit }: ModalProps) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRegister, setIsRegister] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<LoginData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      setTimeout(() => emailRef.current?.focus(), 0);
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isValidEmail(form.email)) {
      setError("Invalid email");
      return;
    }

    if (isRegister && form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const auth = getAuth(initFirebase());
      let userCredential;

      if (isRegister) {
        userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
        console.log("Registered user:", userCredential.user);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
        console.log("Logged in user:", userCredential.user);
      }

        if (onSubmit) {
          await onSubmit(form);
        } else {
          login();
          onClose();
          router.push("/for-you");
        }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError(null);
    setLoading(true);

    try {
      const auth = getAuth(initFirebase());
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      console.log("Google user:", result.user);
      login();
      onClose();
      router.push("/for-you");
    } catch (err: any) {
      console.error(err);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGuestLogin() {
    login();
    onClose();
    router.push("/for-you");
  }

  async function handlePasswordReset() {
    if (!isValidEmail(form.email)) {
      setError("Enter a valid email first");
      return;
    }
    setLoading(true);
    try {
      const auth = getAuth(initFirebase());
      await sendPasswordResetEmail(auth, form.email);
      alert("Password reset email sent!");
    } catch (err: any) {
      setError(err.message || "Could not send reset email");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 w-full h-full"
      role="dialog"
      aria-modal="true"
      aria-label={isRegister ? "Register" : "Login"}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-[400px] rounded-lg bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)]">
        <header className="relative border-b border-[#eee] px-5 py-4 text-center">
          <h2 className="font-bold text-lg">{isRegister ? "Register on Summarist" : "Log in to Summarist"}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
        </header>

        <div className="px-8 pt-12 pb-6 space-y-4">
          {/* Guest login */}
          <button
            onClick={handleGuestLogin}
            type="button"
            className="relative mb-4 flex w-full items-center justify-center gap-2 rounded-md bg-indigo-700 py-3 text-base font-medium text-white hover:bg-indigo-800"
          >
            <AiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2" size={20} />
            Login as a Guest
          </button>

          {/* OR Divider */}
          <div className="flex items-center gap-3 py-3">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          {/* Google login */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            disabled={loading}
            className="relative flex w-full items-center justify-center gap-2 rounded-md bg-indigo-700 py-3 text-base font-medium text-white hover:bg-blue-600"
          >
            <Image className="absolute left-4 top-1/2 -translate-y-1/2" src="/google.png" alt="Google" width={18} height={18} />
            {loading ? "Signing in..." : "Login with Google"}
          </button>

          {/* OR Divider */}
          <div className="flex items-center gap-3 py-3">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          {/* Email / Password Form */}
          <form className="flex flex-col gap-1.5" onSubmit={handleSubmit}>
            {error && <div className="rounded-md bg-red-100 text-red-600 px-3 py-2 text-sm">{error}</div>}

            <input
              ref={emailRef}
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                setError(null);
              }}
              required
              className="rounded-md border border-[#ddd] px-3 py-3 text-base placeholder:text-gray-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                setError(null);
              }}
              required
              className="rounded-md border border-[#ddd] px-3 py-3 text-base placeholder:text-gray-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-md bg-[#2bd97c] py-2 text-white hover:bg-[#20ba68] disabled:opacity-65 text-base font-medium"
            >
              {loading ? (isRegister ? "Registering..." : "Logging in...") : isRegister ? "Register" : "Login"}
            </button>

            <button
              type="button"
              onClick={handlePasswordReset}
              className="bg-transparent border-none text-blue-500 hover:underline text-sm mx-auto mt-1"
            >
              Forgot your password?
            </button>
          </form>
        </div>

        {/* Footer: toggle Login/Register */}
        <footer className="border-t border-[#eee] bg-gray-100 py-3 text-center">
          <button
            type="button"
            className="text-blue-500 hover:underline text-sm"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
          </button>
        </footer>
      </div>
    </div>
  );
}
