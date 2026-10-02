import Games from "@/components/sections/Games";
import { getGamesData } from "@/lib/psn";

// Re-fetch PSN at most hourly (segment config must be a literal).
export const revalidate = 3600;

const GamesPage = async () => <Games games={await getGamesData()} />;

export default GamesPage;
