"use client";

import { useEffect } from "react";

interface AdSlotProps {
  slotId: string;
  format?: "auto" | "fluid" | "rectangle";
  responsive?: boolean;
}

export default function AdSlot({ slotId, format = "auto", responsive = true }: AdSlotProps) {
  useEffect(() => {
    // Attempt to initialize adsbygoogle after component mounts
    try {
      if (typeof window !== "undefined") {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.warn("AdSense script initialization failed or ad block blocked:", err);
    }
  }, []);

  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    // Show a high-fidelity placeholder in development
    return (
      <div className="w-full my-8 p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center min-h-[120px] select-none text-center">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          Google AdSense Unit
        </span>
        <span className="text-xs text-slate-500 font-medium mt-1">
          Ad Slot ID: {slotId} ({format})
        </span>
        <span className="text-[9px] text-slate-400 mt-2 font-mono">
          Only visible in production after AdSense approval
        </span>
      </div>
    );
  }

  // Active Google AdSense tag in production (Replace client ID with your actual AdSense ID)
  return (
    <div className="w-full my-8 overflow-hidden flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9806436984867634"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
