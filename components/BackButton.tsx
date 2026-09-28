"use client";

import { useRouter } from "next/navigation";

import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

const BackButton = ({ href, className = "", children }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "-ml-3 text-muted-foreground hover:text-foreground",
        className,
      )}
      onClick={() => router.push(href)}
    >
      {children}
    </Button>
  );
};

export default BackButton;
