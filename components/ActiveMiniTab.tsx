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
            Hide Contributions
            <Minus size={12} />
          </>
        ) : (
          <>
            Show Contributions
            <Plus size={12} />
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
            Hide Now Playing
            <Minus size={12} />
          </>
        ) : (
          <>
            Show Now Playing
            <Plus size={12} />
          </>
        )}
      </button>
    </div>
  );
};

export default ActiveMiniTabs;
