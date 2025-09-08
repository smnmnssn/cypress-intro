"use client";
import { useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 flex items-center justify-center w-full"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{ background: "rgba(0,0,0,0.4)" }}
    >
      <div
        ref={dialogRef}
        className="bg-white p-4 rounded-lg min-w-[320px] max-w-[90vw]"
      >
        {title && (
          <h2 id="modal-title" className="text-lg font-semibold mb-3">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}
