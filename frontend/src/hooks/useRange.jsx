const MIN_PAG_NUM = 3 + 2 + 2;
const FIRST_PAGE_NUM = 1;
const DOT = "...";

const ranger = (start, end) => {
  let range = end - start + 1;
  return Array.from({ length: range }, (_, i) => i + start);
};

function useRange(page, totalPage) {
  const range = (page, totalPage) => {
    if (totalPage <= MIN_PAG_NUM) {
      return [...ranger(1, totalPage || 1)];
    }

    const inLeft = page <= 3;
    const inRight = page >= totalPage - 2;

    if (inLeft) {
      let isLeftBoundary = page - 1 === FIRST_PAGE_NUM + 1;

      return !isLeftBoundary
        ? [...ranger(1, 3), DOT, totalPage]
        : [1, ...ranger(page - 1, page + 1), DOT, totalPage];
    }

    if (inRight) {
      let isRightBoundary = totalPage - 1 === page + 1;

      return !isRightBoundary
        ? [1, DOT, ...ranger(totalPage - 2, totalPage)]
        : [1, DOT, ...ranger(page - 1, page + 1), totalPage];
    }

    if (!inLeft && !inRight) {
      return [1, DOT, ...ranger(page - 1, page + 1), DOT, totalPage];
    }
  };
  return range(page, totalPage);
}

export default useRange;
