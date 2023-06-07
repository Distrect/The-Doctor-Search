import { useEffect, useMemo, useReducer, useRef } from "react";
import { dispatchContext, sandfContext, pageContext } from "./Context";
import { getDoctors } from "../util";

const mobileView = window.matchMedia("(max-width:800px)");

const initialState = {
  mobile: mobileView.matches,
  totalPage: 0,
  doctors: [],
  page: 1,
  loading: true,
  sort: "name",
  filters: {},
  querry: "",
  err: false,
};

const reducer = (state, action) => {
  if (action.type === "mobileviewchange") {
    return { ...state, mobile: action.mobile };
  }

  if (action.type === "FILTERCHANGE") {
    return { ...state, page: 1, loading: true, filters: action.filters };
  }

  if (action.type === "PAGECHANGE") {
    return { ...state, page: action.page, loading: true };
  }

  if (action.type === "QUERRYCHANGE") {
    return {
      ...state,
      page: 1,
      totalPage: 0,
      loading: true,
      filters: {},
      querry: action.querry,
    };
  }

  if (action.type === "START") {
    return { ...state, loading: true };
  }

  if (action.type === "END") {
    const { doctors, count } = action;
    const pageCount = Math.ceil(count / 12);
    const page = state.page >= pageCount ? { page: pageCount } : {};
    /*console.log({
      ...state,
      doctors: state.mobile ? [...state.doctors, ...doctors] : doctors,
      loading: false,
      ...page,
      totalPage: pageCount,
    });*/
    return {
      ...state,
      doctors: state.mobile ? [...state.doctors, ...doctors] : doctors,
      loading: false,
      ...page,
      totalPage: pageCount,
    };
  }

  if (action.type === "ERROR") {
    return { ...state, err: true, loading: false };
  }

  if (action.type === "SORTCHANGE") {
    return { ...state, loading: true, sort: action.sortValue };
  }

  return state;
};

// eslint-disable-next-line react/prop-types
function Context({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stateValue = useMemo(() => state, [state]);
  const dispatchValue = useMemo(() => dispatch, [dispatch]);
  const timeoutId = useRef(null);

  useEffect(() => {
    const resizeHandler = () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(() => {
        const { innerWidth } = window;
        const isMobile = innerWidth <= 800;
        dispatchValue({ type: "mobileviewchange", mobile: isMobile });
      }, 200);
    };

    const fetchDoctors = async () => {
      try {
        const {
          result: { rows, count },
        } = await getDoctors({
          page: stateValue.page,
          ...stateValue.filters,
          sort: stateValue.sort,
        });

        dispatchValue({
          type: "END",
          doctors: rows,
          count,
        });
      } catch (error) {
        console.log(error);
        dispatchValue({ type: "ERROR" });
      }
    };
    fetchDoctors();

    window.addEventListener("resize", resizeHandler);

    return () => {
      console.log("hello");
      window.removeEventListener("resize", resizeHandler);
    };
  }, [
    stateValue.page,
    stateValue.filters,
    stateValue.querry,
    stateValue.sort,
    dispatchValue,
  ]);

  return (
    <sandfContext.Provider value={stateValue}>
      <dispatchContext.Provider value={dispatchValue}>
        <pageContext.Provider value={stateValue.totalPage}>
          {children}
        </pageContext.Provider>
      </dispatchContext.Provider>
    </sandfContext.Provider>
  );
}

export default Context;

/*
   const scrollHandler = () => {
      const isInEnd =
        window.innerHeight + Math.ceil(document.documentElement.scrollTop);

      if (!infinteRef.current) return;
      if (
        isInEnd !== document.documentElement.scrollHeight ||
        stateValue.loading
      )
        return;

      const { page, totalPage } = stateValue;
      if (page + 1 > totalPage) return;
      dispatchValue({ type: "PAGECHANGE", page: page + 1, inf: true });
    };
*/
