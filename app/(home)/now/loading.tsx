import { NowSkeleton } from "@/components/skeletons/TabSkeletons";

// Favourite films need the Letterboxd API (lib/letterboxd.ts).
const NowLoading = () => (
  <NowSkeleton withFavouriteFilms={Boolean(process.env.LETTERBOXD_API_KEY)} />
);

export default NowLoading;
