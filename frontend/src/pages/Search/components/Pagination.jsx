import useRange from "../../../hooks/useRange";
import pagStyles from "../styles/CardContainer.module.css";
import globalStyles from "../styles/Search.module.css";
import Loader from "../../../components/Loader";
import { useContext, useEffect } from "react";
import {
  dispatchContext,
  pageContext,
  sandfContext,
} from "../../../context/Context";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const DOT = "...";

function Pagination() {
  const stateValue = useContext(sandfContext);
  const totalPage = useContext(pageContext);
  const dispatch = useContext(dispatchContext);
  const arr = useRange(stateValue.page, totalPage);

  const handleClick = ({ target: { textContent } }) => {
    if (textContent === DOT) return;
    let cPage = +textContent;
    if (cPage === stateValue.page) return;
    dispatch({ type: "PAGECHANGE", page: cPage });
  };

  const nextprevHandler = (direction) => () => {
    if (stateValue.page - 1 <= 1 && stateValue.page + 1 >= totalPage) return;
    let newPage = direction === "n" ? stateValue.page + 1 : stateValue.page - 1;
    dispatch({ type: "PAGECHANGE", page: newPage });
  };

  useEffect(() => {
    const scrollHandler = () => {
      if (!stateValue.mobile) return;
      const isInEnd =
        window.innerHeight + Math.ceil(document.documentElement.scrollTop);

      if (
        isInEnd !== document.documentElement.scrollHeight ||
        stateValue.loading
      )
        return;

      if (stateValue.page + 1 > stateValue.totalPage) return;
      dispatch({ type: "PAGECHANGE", page: stateValue.page + 1, inf: true });
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [
    stateValue.mobile,
    stateValue.loading,
    stateValue.page,
    stateValue.totalPage,
    dispatch,
  ]);

  return (
    <>
      {stateValue.mobile && stateValue.loading && <Loader />}
      <div className={globalStyles["pagination-container"]}>
        <span className={pagStyles["butt"]}>
          <AiOutlineLeft onClick={nextprevHandler("p")} />
        </span>
        <div className={pagStyles["page-button-container"]}>
          {arr.map((val, i) => (
            <span
              key={i}
              onClick={handleClick}
              className={
                pagStyles["page-button"] +
                " " +
                (stateValue.page === val ? pagStyles["active"] : "")
              }
            >
              {val}
            </span>
          ))}
        </div>
        {/* )} */}
        <span className={pagStyles["butt"]}>
          <AiOutlineRight onClick={nextprevHandler("n")} />
        </span>
      </div>
    </>
  );
}

export default Pagination;

// const ranger = (start, end) => {
//   let range = end - start + 1;
//   return Array.from({ length: range }, (_, i) => i + start);
// };

// const MIN_PAG_NUM = 3 + 2 + 2;
// const FIRST_PAGE_NUM = 1;

/*
  useEffect(() => {
    const generatePagination = () => {
      if (totalPage <= MIN_PAG_NUM) {
        return setArr([...ranger(1, MIN_PAG_NUM)]);
      }

      const inLeft = page <= 3;
      const inRight = page >= totalPage - 2;

      if (inLeft) {
        let isLeftBoundary = page - 1 === FIRST_PAGE_NUM + 1;
        setArr(() =>
          !isLeftBoundary
            ? [...ranger(1, 3), DOT, totalPage]
            : [1, ...ranger(page - 1, page + 1), DOT, totalPage]
        );
      }

      if (inRight) {
        let isRightBoundary = totalPage - 1 === page + 1;
        setArr(() =>
          !isRightBoundary
            ? [1, DOT, ...ranger(totalPage - 2, totalPage)]
            : [1, DOT, ...ranger(page - 1, page + 1), totalPage]
        );
      }

      if (!inLeft && !inRight) {
        setArr([1, DOT, ...ranger(page - 1, page + 1), DOT, totalPage]);
      }
    };

    generatePagination();
  }, [page, totalPage]);
*/

/*
 const generatePagination = () => {
      console.log("dsadsadsa");
      if (totalPageNumbers >= totalPage) return setArr(ranger(1, totalPage));

      const leftIndex = page - 1;
      const rightIndex = Math.min(page + 1, totalPage);

      let showLeftDots = leftIndex > 2;
      let showRightDots = rightIndex < totalPage - 2;

      if (showLeftDots && showRightDots) {
        return setArr([1, "...", page - 1, page, page + 1, "...", totalPage]);
      }

      if (!showLeftDots && showRightDots) {
        return setArr([...ranger(1, 5), "...", totalPage]);
      }

      if (showLeftDots && !showRightDots) {
        return setArr([1, "...", ranger(totalPage - 5, totalPage)]);
      }
    };

*/

/*
if (totalPage <= MIN_PAG_NUM) {
        return setArr([...ranger(1, MIN_PAG_NUM)]);
      }

      const showLeft =
        FIRST_PAGE_NUM + 1 <= page - 1 ;
      const showRight =
        totalPage - 1 >= page + 1
         ;

      if (!showLeft && showRight) {
      
         return setArr([...ranger(1, 3), DOT, totalPage]);
      }

      if (showLeft && !showRight) {
       
         return setArr([1, DOT, ...ranger(totalPage - 2, totalPage)]);
      }
      
      //if (showLeft && showRight) {
      //  let l = page - 1 === 2;
      //  let r = totalPage - 2 === page;

      //  if (l) {
      //    return setArr([...ranger(1, page + 1), DOT, totalPage]);
      //  }

      //  if (r) {
      //    return setArr([1, DOT, ...ranger(page - 1, totalPage)]);
      //  }

      //  return setArr([1, DOT, ...ranger(page - 1, page + 1), DOT, totalPage]);
      }
*/
