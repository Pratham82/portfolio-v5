import {
  CloudFogIcon,
  CloudIcon,
  CloudLightningIcon,
  CloudMoonIcon,
  CloudRainIcon,
  CloudSnowIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  type Icon,
} from "@phosphor-icons/react";

import type { Weather } from "@/lib/weather";

/** Picks an icon and label for a WMO weather code (see open-meteo.com/en/docs). */
const describe = (code: number, isDay: boolean): [Icon, string] => {
  if (code === 0) return isDay ? [SunIcon, "Clear"] : [MoonIcon, "Clear"];
  if (code <= 2)
    return isDay
      ? [CloudSunIcon, "Partly cloudy"]
      : [CloudMoonIcon, "Partly cloudy"];
  if (code === 3) return [CloudIcon, "Overcast"];
  if (code === 45 || code === 48) return [CloudFogIcon, "Fog"];
  if ((code >= 71 && code <= 77) || code === 85 || code === 86)
    return [CloudSnowIcon, "Snow"];
  if (code >= 95) return [CloudLightningIcon, "Thunderstorm"];
  if (code >= 51) return [CloudRainIcon, "Rain"];
  return [CloudIcon, "Cloudy"];
};

const WeatherIcon = ({ code, isDay }: Pick<Weather, "code" | "isDay">) => {
  const [IconComponent, label] = describe(code, isDay);
  return (
    // `alt` renders a <title>: a hover tooltip and the screen reader label.
    <IconComponent
      size="1.1em"
      weight="bold"
      alt={label}
      className="inline-block align-[-0.15em]"
    />
  );
};

export default WeatherIcon;
