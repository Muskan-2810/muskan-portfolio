import { Trophy } from "lucide-react";

/**
 * Small organization mark shown on each experience timeline entry.
 * "google" renders a simplified four-color G in the spirit of Google's
 * standard multi-color mark, sized for a compact 40px badge context.
 */
export default function OrgMark({
  type,
}: {
  type: "google" | "microsoft" | "infosys" | "trophy" | "aws" | "cisco";
}) {
  if (type === "google") {
    return (
      <svg viewBox="0 0 48 48" className="h-6 w-6" aria-label="Google">
        <path
          fill="#4285F4"
          d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
        />
        <path
          fill="#34A853"
          d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
        />
        <path
          fill="#FBBC05"
          d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.93 21.93 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
        />
        <path
          fill="#EA4335"
          d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
        />
      </svg>
    );
  }
  if (type === "microsoft") {
  return (
    <div
      className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#5E5E5E] font-display text-[10px] font-bold text-white"
      aria-label="Microsoft"
    >
      M
    </div>
  );
}

  if (type === "infosys") {
    return (
      <div
        className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#007CC3] font-display text-[10px] font-bold text-white"
        aria-label="Infosys"
      >
        In
      </div>
    );
  }

  if (type === "aws") {
    return (
      <div
        className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#161E2D] font-display text-[9px] font-bold uppercase text-[#FF9900]"
        aria-label="AWS"
      >
        aws
      </div>
    );
  }

  if (type === "cisco") {
    return (
      <div
        className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#049FD9] font-display text-[10px] font-bold text-white"
        aria-label="Cisco"
      >
        C
      </div>
    );
  }

  return <Trophy size={22} className="text-glow-blue" aria-label="Hackathon award" />;
}
