"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  subscriptionType: "basic" | "premium" | "premium-plus";
  login: () => void;
  logout: () => void;
  setSubscriptionType: (type: "basic" | "premium" | "premium-plus") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [subscriptionType, setSubscriptionType] = useState<"basic" | "premium" | "premium-plus">("basic");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedLoggedIn = localStorage.getItem("isLoggedIn");
      const storedSubscription = localStorage.getItem("subscriptionType") as "basic" | "premium" | "premium-plus" | null;

      setIsLoggedIn(storedLoggedIn === "true");
      if (storedSubscription) setSubscriptionType(storedSubscription);
    } catch (e) {}
  }, []);

  // Save to localStorage when values change
  useEffect(() => {
    try {
      localStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
      localStorage.setItem("subscriptionType", subscriptionType);
    } catch (e) {}
  }, [isLoggedIn, subscriptionType]);

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    setSubscriptionType("basic");
  };

  const setSubscription = (type: "basic" | "premium" | "premium-plus") => setSubscriptionType(type);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, subscriptionType, login, logout, setSubscriptionType: setSubscription }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
