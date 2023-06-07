import { memo, useEffect, useRef } from "react";
import filterStyle from "../styles/Filter.module.css";

const FilterBox = function FilterBox({
  index,
  filter: { title, attr },
  setFilters,
}) {
  const ulRef = useRef(null);
  const mobileView = window.matchMedia("(max-width:800px)");

  const handleClick = (e) => {
    if (!mobileView.matches || !ulRef.current) return;
    if (e.currentTarget.classList.contains(filterStyle["active"])) {
      e.currentTarget.classList.remove(filterStyle["active"]);
    } else {
      e.currentTarget.classList.add(filterStyle["active"]);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const {
        parentElement: { parentElement },
      } = ulRef.current;
      if (!parentElement.contains(e.target)) {
        parentElement.classList.remove(filterStyle["active"]);
      }
    };

    //document.body.addEventListener("click", handleOutsideClick);

    const handleChange = (e) => {
      const { checked, name } = e.target;

      if (checked) {
        setFilters((prevFilters) => {
          const newFilters = { ...prevFilters };
          if (!newFilters[index]) newFilters[index] = [];
          newFilters[index].push(name);
          return newFilters;
        });
      } else {
        setFilters((prevFilters) => {
          const newFilters = { ...prevFilters };
          newFilters[index].splice(newFilters[index].indexOf(name), 1);
          return newFilters;
        });
      }
    };

    const checkBoxes = ulRef.current.querySelectorAll("input[type='checkbox']");
    checkBoxes.forEach((el) => el.addEventListener("change", handleChange));

    return () => {
      checkBoxes.forEach((el) =>
        el.removeEventListener("change", handleChange)
      );
    };
  }, [index, setFilters, mobileView]);

  return (
    <div className={filterStyle["filter-box"]} onClick={handleClick}>
      <h3>{title}</h3>

      <div className={filterStyle["wrap"]}>
        <ul
          ref={ulRef}
          className={filterStyle["filters"]}
          onClick={(e) => e.stopPropagation()}
        >
          {title !== "Rating"
            ? attr.map((val, i) => {
                const ent = Object.values(val)[0];

                return (
                  <li key={i}>
                    <label htmlFor={ent}>{ent}</label>
                    <span className={filterStyle["checkbox"]}>
                      <input type="checkbox" name={ent} id={ent} />
                    </span>
                  </li>
                );
              })
            : attr[0]}
        </ul>
      </div>
    </div>
  );
};

const MemoizedFilterBox = memo(FilterBox);

export default MemoizedFilterBox;

/*new Array(5).fill(0).map((_, i) => (
                <svg
                  key={i}
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

                // <AiOutlineStar
                // onMouseEnter={handleHover}
                // data-index={i}
                // style={{
                // fill: "black",
                // width: "1.25rem",
                // height: "1.25rem",
                // }}
                // className={filterStyle["rating"]}
                // key={i}
                // />
              )) */
