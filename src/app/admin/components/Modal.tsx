
"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-2xl" }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) { document.addEventListener("keydown", handleEscape); document.body.style.overflow = "hidden"; }
    return () => { document.removeEventListener("keydown", handleEscape); document.body.style.overflow = ""; };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4" onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className={`relative ${maxWidth} w-full liquid-glass rounded-t-3xl sm:rounded-3xl shadow-2xl shadow-black/50 max-h-[92vh] sm:max-h-[90vh] flex flex-col`}>
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/5 shrink-0">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button onClick={onClose} className="p-2.5 rounded-xl text-rm-text-muted hover:text-white hover:bg-white/10 transition-all active:scale-95">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 sm:p-6 overflow-y-auto overscroll-contain">{children}</div>
      </div>
    </div>
  );
}
