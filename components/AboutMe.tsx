import Link from "next/link";

import {
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import GitHubCalendar from "react-github-calendar";
import { SiLetterboxd, SiSpotify } from "react-icons/si";

import PageAnimationContainer from "./PageAnimationContainer";

interface SocialCard {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  icon: React.ReactNode;
  button?: {
    text: string;
    color?: string;
  };
  customContent?: React.ReactNode;
}

const AboutMe = () => {
  const { theme } = useTheme();

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
      title: "@pratham82.sh",
      url: "https://www.instagram.com/pratham82.sh/",
      icon: <InstagramLogoIcon size={32} weight="fill" />,
      button: {
        text: "Follow 190",
        color: "bg-blue-500",
      },
    },
    {
      id: "github",
      title: "Prathamesh Mali",
      url: "https://github.com/Pratham82",
      icon: <GithubLogoIcon size={32} weight="fill" />,
      button: {
        text: "Follow",
        color: "bg-gray-200 dark:bg-gray-700",
      },
      customContent: (
        <div className="mt-4">
          <div className="overflow-x-auto">
            <GitHubCalendar
              username="Pratham82"
              colorScheme={theme === "dark" ? "dark" : "light"}
              blockSize={6}
              fontSize={10}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            1115 contributions in the last year
          </p>
        </div>
      ),
    },
    {
      id: "twitter",
      title: "Twitter",
      subtitle: "@Pratham_82",
      url: "https://www.twitter.com/pratham_82",
      icon: <XLogoIcon size={32} weight="fill" />,
      button: {
        text: "Follow",
        color: "bg-blue-500",
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
      title: "Chill HipHop Dhh",
      subtitle: "40 songs",
      url: "https://open.spotify.com/playlist/your-playlist-id",
      icon: <SiSpotify size={32} className="text-green-500" />,
      button: {
        text: "Play",
        color: "bg-green-500",
      },
    },
    {
      id: "letterboxd",
      title: "Pratham82's profile",
      subtitle: "letterboxd.com",
      url: "https://letterboxd.com/pratham82/",
      icon: <SiLetterboxd size={32} />,
    },
  ];

  return (
    <PageAnimationContainer className="sm:w-[575px]">
      <h1 className="text-2xl font-bold mb-4">About Me</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {socialCards.map((card) => (
          <Link
            key={card.id}
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition relative w-full"
          >
            <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0">{card.icon}</div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold truncate">
                    {card.title}
                  </h3>
                  {card.subtitle && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {card.subtitle}
                    </p>
                  )}
                </div>
              </div>
              {card.button && (
                <button
                  className={`${card.button.color || "bg-blue-500"} text-white text-xs px-3 py-1.5 rounded-full font-medium flex-shrink-0 hover:opacity-90 transition`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(card.url, "_blank");
                  }}
                >
                  {card.button.text}
                </button>
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
