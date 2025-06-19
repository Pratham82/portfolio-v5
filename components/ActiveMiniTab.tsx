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
        className={`text-sm text-black dark:text-white hover:underline ${
          visibleData.isContributionsVisible ? "font-bold" : ""
        }`}
      >
        Show Contributions
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
        className={`text-sm text-black dark:text-white hover:underline ${
          visibleData.isNowPlayingVisible ? "font-bold" : ""
        }`}
      >
        Show Now playing
      </button>
    </div>
  );
};

export default ActiveMiniTabs;
