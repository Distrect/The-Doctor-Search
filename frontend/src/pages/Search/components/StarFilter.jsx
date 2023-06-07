import { useEffect, useRef } from "react";
import filterStyle from "../styles/Filter.module.css";

function StarFilter({ setFilters }) {
  const liRef = useRef(null);
  const selectedRating = useRef(null);

  useEffect(() => {
    const r = liRef.current;
    const allStars = liRef.current.querySelectorAll("svg");

    const clearClassname = (clearAll) => {
      const { current } = selectedRating;

      if (clearAll || !current) {
        allStars.forEach((node) =>
          node.classList.remove(filterStyle["star-active"])
        );
      } else {
        Array.from(allStars)
          .slice(current, allStars.length - 1)
          .forEach((node) => node.classList.remove(filterStyle["star-active"]));
      }
    };

    const parentHandleMouseLeave = () => clearClassname();

    const handleStarClick = (e) => {
      const index = +e.currentTarget.getAttribute("data-index");
      selectedRating.current = index;
      setFilters((prevFilters) => {
        const newFilters = { ...prevFilters };
        newFilters["rating"] = index;
        return newFilters;
      });
    };

    const starHandleMouseEnter = (e) => {
      clearClassname(true);
      const index = +e.currentTarget.getAttribute("data-index");

      for (let i = 0; i <= index; i++) {
        allStars[i].classList.add(filterStyle["star-active"]);
      }
    };

    allStars.forEach((val) => {
      val.addEventListener("mouseenter", starHandleMouseEnter);
      val.addEventListener("click", handleStarClick);
    });
    liRef.current.addEventListener("mouseleave", parentHandleMouseLeave);

    return () => {
      r.removeEventListener("mouseleave", parentHandleMouseLeave);
      allStars.forEach((val) =>
        val.removeEventListener("mouseenter", starHandleMouseEnter)
      );
    };
  }, [setFilters]);

  return (
    <li ref={liRef}>
      {new Array(5).fill(0).map((_, i) => (
        <svg
          key={i}
          data-index={i}
          width={"1.2rem"}
          height={"1.2rem"}
          className={filterStyle["rating"]}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <path
            d="M50,0 L61.18,28.98 L93.53,34.64 L68.45,56.15 L74.41,88.98 L50,72.29 L25.59,88.98 L31.55,56.15 L6.47,34.64 L38.82,28.98 Z"
            fill="transparent"
            stroke="#000000"
            strokeWidth="5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </li>
  );
}

export default StarFilter;
