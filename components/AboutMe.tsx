"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import {
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { SiLetterboxd, SiSpotify } from "react-icons/si";

import { Button } from "@/components/ui/button";
import { CALENDAR_THEME } from "@/src/data/calendarTheme";

import PageAnimationContainer from "./PageAnimationContainer";
import PageTitle from "./PageTitle";

// Client-only: the calendar depends on today's date and the resolved theme,
// so rendering it on the server causes a hydration mismatch.
const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false },
);

interface SocialCard {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  icon: React.ReactNode;
  button?: {
    text: string;
  };
  customContent?: React.ReactNode;
}

const AboutMe = () => {
  const { resolvedTheme } = useTheme();

  const socialCards: SocialCard[] = [
    {
      id: "website",
      title: "Prathamesh's Website",
      subtitle: "pratham82.in",
      url: "https://pratham82.in",
      // Charizard emoji as placeholder
      icon: <div className="text-4xl">🔥</div>,
    },
    {
      id: "instagram",
      title: "Insta",
      subtitle: "@pratham82.sh",
      url: "https://www.instagram.com/pratham82.sh/",
      icon: <InstagramLogoIcon size={32} weight="fill" />,
      button: {
        text: "Follow 190",
      },
    },

    {
      id: "twitter",
      title: "Twitter",
      subtitle: "@Pratham_82",
      url: "https://www.twitter.com/pratham_82",
      icon: <XLogoIcon size={32} weight="fill" />,
      button: {
        text: "Follow",
      },
    },
    {
      id: "linkedin",
      title: "Prathamesh Mali",
      subtitle: "linkedin.com",
      url: "https://www.linkedin.com/in/prathameshmali/",
      icon: <LinkedinLogoIcon size={32} weight="fill" />,
    },
    {
      id: "spotify",
      title: "Pratham82",
      subtitle: "Prathamesh's Spotify",
      url: "https://open.spotify.com/playlist/your-playlist-id",
      icon: <SiSpotify size={32} />,
      button: {
        text: "Play",
      },
    },
    {
      id: "letterboxd",
      title: "Pratham82's profile",
      subtitle: "letterboxd.com",
      url: "https://letterboxd.com/pratham82/",
      icon: <SiLetterboxd size={32} />,
    },
    {
      id: "github",
      title: "Prathamesh Mali",
      url: "https://github.com/Pratham82",
      icon: <GithubLogoIcon size={32} weight="fill" />,
      button: {
        text: "Follow",
      },
      customContent: (
        <div className="mt-4">
          <div className="overflow-x-auto">
            <GitHubCalendar
              username="Pratham82"
              colorScheme={resolvedTheme === "light" ? "light" : "dark"}
              theme={CALENDAR_THEME}
              blockSize={6}
              fontSize={10}
            />
          </div>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            1115 contributions in the last year
          </p>
        </div>
      ),
    },
  ];

  return (
    <PageAnimationContainer>
      <PageTitle className="mb-4">About Me</PageTitle>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {socialCards.map((card) => (
          <Link
            key={card.id}
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-full rounded-xl border bg-card/40 p-4 transition-colors hover:bg-accent/50"
          >
            <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="shrink-0 text-muted-foreground">
                  {card.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-medium text-foreground">
                    {card.title}
                  </h3>
                  {card.subtitle && (
                    <p className="truncate text-sm text-muted-foreground">
                      {card.subtitle}
                    </p>
                  )}
                </div>
              </div>
              {card.button && (
                <Button
                  size="xs"
                  variant="secondary"
                  className="shrink-0 rounded-full px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(card.url, "_blank");
                  }}
                >
                  {card.button.text}
                </Button>
              )}
            </div>
            {card.customContent && (
              <div className="mt-4 overflow-x-auto">{card.customContent}</div>
            )}
          </Link>
        ))}
      </div>
    </PageAnimationContainer>
  );
};

export default AboutMe;
