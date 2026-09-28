"use client";

import Image from "next/image";

import { CaretRightIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { WorkExperience } from "../interface/about.interface";
import getFormattedDate from "../src/utils/getFormattedDate";

const WorkExCard = (props: WorkExperience) => {
  const {
    position = "",
    companyName = "",
    location,
    startDate = "",
    endDate = "",
    companyLogo,
    description,
    highlights,
  } = props || {};

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const startDateFormatted = getFormattedDate(startDate, "MMMM yyyy");
  const endDateFormatted = endDate
    ? getFormattedDate(endDate, "MMMM yyyy")
    : "Present";
  return (
    <motion.article
      className="-mx-3 rounded-lg px-3 py-3 transition-colors hover:bg-accent/40"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <header className="flex cursor-pointer items-start gap-4">
          {companyLogo?.asset?.url ? (
            <Image
              src={companyLogo.asset.url}
              alt={companyLogo.asset.label || companyName || "Company logo"}
              width={45}
              height={45}
              className="mt-0.5 rounded-md grayscale-[35%]"
            />
          ) : (
            // Companies that are on the resume but have no logo in Sanity.
            <span
              aria-hidden
              className="mt-0.5 flex size-[45px] shrink-0 items-center justify-center rounded-md border bg-card font-medium text-muted-foreground"
            >
              {companyName.charAt(0)}
            </span>
          )}
          <div>
            <div className="flex gap-2 items-center">
              <h3 className="font-medium text-foreground">{position}</h3>
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    key="arrow"
                    initial={{ x: -5, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-muted-foreground"
                  >
                    <CaretRightIcon size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <p className="text-sm text-muted-foreground">
              <span>{companyName}</span>{" "}
              <span className="text-muted-foreground/60">·</span>
              <span className="ml-1 text-muted-foreground/80">{location}</span>
            </p>
            <time
              className="mt-0.5 block font-mono text-xs text-muted-foreground"
              dateTime={startDate}
            >
              {startDateFormatted} – {endDateFormatted}
            </time>
          </div>
        </header>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3 overflow-hidden pl-[61px] text-sm leading-relaxed text-muted-foreground"
          >
            {highlights?.length ? (
              <ul className="flex list-disc flex-col gap-1.5 pl-4 marker:text-muted-foreground/50">
                {highlights.map(({ label, text }) => (
                  <li key={`${label ?? ""}${text}`}>
                    {label && (
                      <span className="font-medium text-foreground/90">
                        {label}:{" "}
                      </span>
                    )}
                    {text}
                  </li>
                ))}
              </ul>
            ) : (
              <p>{description}</p>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default WorkExCard;
