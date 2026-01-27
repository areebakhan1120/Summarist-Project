"use client";

import { useAuth } from "../Auth/AuthContext";
import { useRouter } from "next/navigation";

export default function Settings() {
  const { isLoggedIn, subscriptionType } = useAuth();
  const router = useRouter();

  const handleUpgrade = () => {
    router.push("/choose-plan"); // route to your plan selection
  };

  return (
    <div className="py-10 w-full">
      <div className="px-6 max-w-[1070px] w-full mx-auto">
        <div className="text-[32px] text-[#032b41] font-bold mb-8 text-left border-b border-[#e1e7ea] pb-4">
          Settings
        </div>

        <div className="flex flex-col items-start gap-2 mb-8 border-b border-[#e1e7ea] pb-6">
          <div className="text-[18px] font-bold text-[#032b41]">Your Subscription Plan</div>

          {isLoggedIn ? (
            <>
              <div className="text-[#032b41] font-medium capitalize">{subscriptionType}</div>

              {subscriptionType === "basic" && (
                <button
                  onClick={handleUpgrade}
                  className="mt-2 bg-green-500 text-white font-bold px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Upgrade to Premium
                </button>
              )}
            </>
          ) : (
            <div className="text-[#032b41] font-medium">
              You are not subscribed
            </div>
          )}
        </div>

        <div className="flex flex-col items-start gap-2 mb-8 border-b border-[#e1e7ea] pb-6">
          <div className="text-[18px] font-bold text-[#032b41]">Email</div>
          <div className="text-[#032b41]">hanna@gmail.com</div>
        </div>
      </div>
    </div>
  );
}
