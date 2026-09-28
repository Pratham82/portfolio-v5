"use client";

import { ReactNode, useEffect, useRef } from "react";

type CodeCopyEnhancerProps = {
  children: ReactNode;
  className?: string;
};

/** Wraps rendered MDX and adds a "Copy" button to every code block. */
const CodeCopyEnhancer = ({ children, className }: CodeCopyEnhancerProps) => {
  const mdxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const codeBlocks = mdxRef.current?.querySelectorAll("pre") || [];

    codeBlocks.forEach((block) => {
      if (block.querySelector(".copy-btn")) return;

      const button = document.createElement("button");
      button.textContent = "Copy";
      button.className =
        "copy-btn absolute top-2 right-2 rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-xs text-white/70 transition hover:bg-white/10 hover:text-white";

      button.addEventListener("click", () => {
        const code = block.querySelector("code");
        if (!code) return;

        navigator.clipboard.writeText(code.innerText).then(() => {
          button.textContent = "Copied!";
          setTimeout(() => {
            button.textContent = "Copy";
          }, 1500);
        });
      });

      block.classList.add("relative", "rounded-md", "overflow-hidden");
      block.appendChild(button);
    });
  });

  return (
    <div ref={mdxRef} className={className}>
      {children}
    </div>
  );
};

export default CodeCopyEnhancer;
