"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";

const Providers = ({ children }: { children: ReactNode }) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem
    disableTransitionOnChange
  >
    <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
  </ThemeProvider>
);

export default Providers;
