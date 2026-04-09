import { Minus, Plus } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";

type ActiveMiniTabProps = {
  visibleData: {
    isContributionsVisible: boolean;
    isNowPlayingVisible: boolean;
  };
  setVisibleData: Dispatch<
    SetStateAction<{
      isContributionsVisible: boolean;
      isNowPlayingVisible: boolean;
    }>
  >;
};
const ActiveMiniTabs = (props: ActiveMiniTabProps) => {
  const { visibleData, setVisibleData } = props;
  return (
    <div className="flex w-full gap-4">
      <button
        onClick={() => {
          setVisibleData((prev) => ({
            ...prev,
            isContributionsVisible: !prev.isContributionsVisible,
            isNowPlayingVisible: false,
          }));
        }}
        type="button"
        className={`text-sm text-black dark:text-white hover:underline flex items-center gap-2 ${
          visibleData.isContributionsVisible ? "font-bold underline" : ""
        }`}
      >
        {visibleData.isContributionsVisible ? (
          <>
            <span className="hidden sm:inline">Hide </span>
            <span className="sm:text-sm text-xs">Contributions</span>
            <Minus size={12} className="ml-1" />
          </>
        ) : (
          <>
            <span className="hidden sm:inline">Show </span>
            <span className="sm:text-sm text-xs">Contributions</span>
            <Plus size={12} className="ml-1" />
          </>
        )}
      </button>
      <button
        onClick={() => {
          setVisibleData((prev) => ({
            ...prev,
            isNowPlayingVisible: !prev.isNowPlayingVisible,
            isContributionsVisible: false,
          }));
        }}
        type="button"
        className={`text-sm text-black dark:text-white hover:underline flex items-center gap-2 ${
          visibleData.isNowPlayingVisible ? "font-bold underline" : ""
        }`}
      >
        {visibleData.isNowPlayingVisible ? (
          <>
            <span className="hidden sm:inline">Hide </span>
            <span className="sm:text-sm text-xs">Now Playing</span>
            <Minus size={12} className="ml-1" />
          </>
        ) : (
          <>
            <span className="hidden sm:inline">Show </span>
            <span className="sm:text-sm text-xs">Now Playing</span>
            <Plus size={12} className="ml-1" />
          </>
        )}
      </button>
    </div>
  );
};

export default ActiveMiniTabs;
