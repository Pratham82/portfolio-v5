"use client";

import { useRouter } from "next/navigation";

import { ReactNode } from "react";

type BackButtonProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

const BackButton = ({ href, className = "", children }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      className={`flex items-center py-2 hover:scale-105 transition ease-in ${className}`}
      onClick={() => router.push(href)}
    >
      {children}
    </button>
  );
};

export default BackButton;
