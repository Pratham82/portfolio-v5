const useGetPageData = (props: any) => {
  const pageData = props || {};
  const allDataKeys = Object.keys(pageData);
  const currentPage = allDataKeys[0] || "";
  const {
    title = "",
    subtitle = "",
    ...rest
  } = pageData[currentPage] ? pageData[currentPage][0] : "";

  return {
    title,
    subtitle,
    pageData: rest,
  };
};

export default useGetPageData;
