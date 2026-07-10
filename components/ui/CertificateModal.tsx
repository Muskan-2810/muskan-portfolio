"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ShieldCheck } from "lucide-react";
import OrgMark from "@/components/ui/OrgMark";
import { CERTIFICATIONS_DETAILED } from "@/constants/data";

type Certification = {
  id: string;
  name: string;
  issuer: string;
  year: string;
  logo: "microsoft" | "aws" | "cisco" | "infosys";
  fileUrl: string;
};
interface CertificateModalProps {
  certification: Certification | null;
  onClose: () => void;
}

/**
 * Fullscreen preview modal for a certificate. If `fileUrl` points to a real
 * asset, renders it directly — a PDF in an <iframe>, anything else as an
 * <img>. Until real files are supplied, falls back to a branded certificate
 * placeholder so the interaction is complete and demonstrable today.
 */
export default function CertificateModal({ certification, onClose }: CertificateModalProps) {
  useEffect(() => {
    if (!certification) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [certification, onClose]);

  if (typeof document === "undefined" || !certification) return null;

  const isPdf = certification.fileUrl?.toLowerCase().endsWith(".pdf");

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${certification.name} certificate preview`}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-void/90 p-6 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close certificate preview"
        className="absolute right-6 top-6 rounded-full border border-charcoal-border bg-charcoal/60 p-2.5 text-ink-muted transition-colors hover:text-ink"
      >
        <X size={20} />
      </button>

      <div
        className="glass-panel relative w-full max-w-2xl overflow-hidden rounded-3xl p-1 shadow-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {certification.fileUrl ? (
          isPdf ? (
            <iframe
              src={certification.fileUrl}
              title={certification.name}
              className="h-[75vh] w-full rounded-[20px] bg-white"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={certification.fileUrl}
              alt={certification.name}
              className="w-full rounded-[20px] object-contain"
            />
          )
        ) : (
          <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-6 rounded-[20px] bg-gradient-to-br from-charcoal to-void p-10 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-2xl border border-charcoal-border bg-charcoal/60">
              <OrgMark type={certification.logo} />
            </span>
            <div>
              <h3 className="font-display text-2xl font-medium text-ink">
                {certification.name}
              </h3>
              <p className="mt-2 font-body text-sm text-ink-muted">
                {certification.issuer} · {certification.year}
              </p>
            </div>
            <span className="flex items-center gap-2 rounded-full border border-glow-blue/30 bg-glow-blue/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-glow-blue">
              <ShieldCheck size={14} />
              Verified
            </span>
            <p className="max-w-xs font-mono text-[11px] text-ink-faint">
              Original certificate file available on request.
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
