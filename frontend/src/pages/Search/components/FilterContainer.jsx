import { memo, useEffect, useReducer, useState } from "react";
import searchStyles from "../styles/Search.module.css";
import MemoizedFilterBox from "./FilterBox";
import Loader from "../../../components/Loader";
import { getDoctors, modalContainer } from "../../../util";
import { initialState, newReducer } from "../../../reducer/reducer";
import StarFilter from "./StarFilter";
import { RxCross2 } from "react-icons/rx";
// import { createPortal } from "react-dom";
// import { sandfContext, dispatchContext } from "../../../context/Context";

const filts = ["speciality", "title", "city", "insurance"];

// eslint-disable-next-line react-refresh/only-export-components
function FilterContainer({
  modal: { setOpen },
  context: { contextDispatch, loading },
}) {
  const [filters, setFilters] = useState({});
  const [state, dispatch] = useReducer(newReducer, {
    ...initialState,
    loading: false,
  });

  let mobile = false;

  // const { loading, mobile } = useContext(sandfContext);
  // const contextDispatch = useContext(dispatchContext);

  const saved = JSON.parse(localStorage.getItem("filters")) || null;

  useEffect(() => {
    const getFilters = async () => {
      try {
        dispatch({ type: "TRIGGER", trigger: null });
        const data = await getDoctors({}, "/filters/getfilters", "GET");
        dispatch({ type: "END", data });
      } catch (error) {
        console.log("Filter Container Error", error);
        dispatch({ type: "ERROR", error });
      }
    };
    // !saved && getFilters();
    getFilters();
  }, []);

  const handleSave = () => {
    mobile && setOpen(false) && modalContainer(false);

    // mobile && setOpen(false);
    // mobile && modalContainer(false);
    contextDispatch({
      type: "FILTERCHANGE",
      filters: { ...filters },
    });
  };

  const handleModal = (e) => {
    modalContainer(false);
    setOpen(false);
  };

  return (
    <>
      <div className={searchStyles["fp-wrapper"]}>
        <div className={searchStyles["cross"]}>
          <RxCross2 onClick={handleModal} />
        </div>
        <div className={searchStyles["filter-box-wrapper"]}>
          {state.loading && !state.err ? (
            <Loader />
          ) : (
            <>
              {(saved || state.data).map((val, i) => {
                return (
                  <MemoizedFilterBox
                    index={filts[i]}
                    key={i}
                    setFilters={setFilters}
                    filter={{ title: val.title, attr: val.attr }}
                  />
                );
              })}
              <MemoizedFilterBox
                index={"rating"}
                setFilters={setFilters}
                filter={{
                  title: "Rating",
                  attr: [
                    <StarFilter setFilters={setFilters} key={"starkey"} />,
                  ],
                }}
              />
              <button
                disabled={loading}
                className={searchStyles["save-button"]}
                onClick={handleSave}
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const MemoizedFilterContainer = memo(FilterContainer);

export default MemoizedFilterContainer;

/*
const getFilters = async () => {
      dispatch({ type: "start" });
      await fetch("http://localhost:2000/filters/getfilters", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          const result = formatData(res.result);
          dispatch({ type: "end", payload: result });
          localStorage.setItem("filters", JSON.stringify(result));
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: "error", err: true });
        });
    };

*/

// (
//   <>
//     {!mobile ? (
//       <div className={searchStyles["fp-wrapper"]}>
//         <div className={searchStyles["filter-box-wrapper"]}>
//           {state.loading && !state.err ? (
//             <Loader />
//           ) : (
//             <>
//               {(saved || state.data).map((val, i) => {
//                 return (
//                   <MemoizedFilterBox
//                     index={filts[i]}
//                     key={i}
//                     setFilters={setFilters}
//                     filter={{ title: val.title, attr: val.attr }}
//                   />
//                 );
//               })}
//               <MemoizedFilterBox
//                 index={"rating"}
//                 setFilters={setFilters}
//                 filter={{
//                   title: "Rating",
//                   attr: [
//                     <StarFilter setFilters={setFilters} key={"starkey"} />,
//                   ],
//                 }}
//               />
//               <button
//                 disabled={loading}
//                 className={searchStyles["save-button"]}
//                 onClick={handleSave}
//               >
//                 Save
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     ) : open ? (
//       createPortal(
//         <div className={searchStyles["fp-wrapper"]}>
//           <div className={searchStyles["cross"]}>
//               <RxCross2 onClick={handleModal} />
//             </div>
//           <div className={searchStyles["filter-box-wrapper"]}>
//             {state.loading && !state.err ? (
//               <Loader />
//             ) : (
//               <>
//                 {(saved || state.data).map((val, i) => {
//                   return (
//                     <MemoizedFilterBox
//                       index={filts[i]}
//                       key={i}
//                       setFilters={setFilters}
//                       filter={{ title: val.title, attr: val.attr }}
//                     />
//                   );
//                 })}
//                 <MemoizedFilterBox
//                   index={"rating"}
//                   setFilters={setFilters}
//                   filter={{
//                     title: "Rating",
//                     attr: [
//                       <StarFilter setFilters={setFilters} key={"starkey"} />,
//                     ],
//                   }}
//                 />
//                 <button
//                   disabled={loading}
//                   className={searchStyles["save-button"]}
//                   onClick={handleSave}
//                 >
//                   Save
//                 </button>
//               </>
//             )}
//           </div>
//         </div>,
//         document.getElementById("modal-container")
//       )
//     ) : null}
//   </>
// )

/*
(
    <>
      {!mobile ? (
        <div className={searchStyles["fp-wrapper"]}>
          <div className={searchStyles["filter-box-wrapper"]}>
            {state.loading && !state.err ? (
              <Loader />
            ) : (
              <>
                {(saved || state.data).map((val, i) => {
                  return (
                    <MemoizedFilterBox
                      index={filts[i]}
                      key={i}
                      setFilters={setFilters}
                      filter={{ title: val.title, attr: val.attr }}
                    />
                  );
                })}
                <MemoizedFilterBox
                  index={"rating"}
                  setFilters={setFilters}
                  filter={{
                    title: "Rating",
                    attr: [
                      <StarFilter setFilters={setFilters} key={"starkey"} />,
                    ],
                  }}
                />
                <button
                  disabled={loading}
                  className={searchStyles["save-button"]}
                  onClick={handleSave}
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      ) : open ? (
        createPortal(
          <div className={searchStyles["fp-wrapper"]}>
            <div className={searchStyles["cross"]}>
              <RxCross2 onClick={handleModal} />
            </div>
            <div className={searchStyles["filter-box-wrapper"]}>
              {state.loading && !state.err ? (
                <Loader />
              ) : (
                <>
                  {(saved || state.data).map((val, i) => {
                    return (
                      <MemoizedFilterBox
                        index={filts[i]}
                        key={i}
                        setFilters={setFilters}
                        filter={{ title: val.title, attr: val.attr }}
                      />
                    );
                  })}
                  <MemoizedFilterBox
                    index={"rating"}
                    setFilters={setFilters}
                    filter={{
                      title: "Rating",
                      attr: [
                        <StarFilter setFilters={setFilters} key={"starkey"} />,
                      ],
                    }}
                  />
                  <button
                    disabled={loading}
                    className={searchStyles["save-button"]}
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </>
              )}
            </div>
          </div>,
          document.getElementById("modal-container")
        )
      ) : null}
    </>
  )
*/
