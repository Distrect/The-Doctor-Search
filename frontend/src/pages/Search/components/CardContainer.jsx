import { useContext } from "react";
import containerStyles from "../styles/CardContainer.module.css";
import Card from "./Card";
import { sandfContext } from "../../../context/Context";
import globalStyles from "../styles/Search.module.css";
function CardContainer() {
  const state = useContext(sandfContext);

  return (
    <div
      className={
        globalStyles["card-container"] +
        " " +
        (state.loading ? containerStyles["loading"] : "")
        //containerStyles["loading"]
      }
    >
      {state.err ? (
        <h1>Kardeşim bir hata var</h1>
      ) : (
        state.doctors.map((val, i) => <Card doctor={val} key={i} />)
      )}
    </div>
  );
}

export default CardContainer;

/*

{state.loading
        ? "loading"
        : state.err
        ? "err"
        : state.doctors.map((val, i) => <Card doctor={val} key={i} />)}

*/

/*
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetcher = async () => {
      await fetch("http://localhost:2000/filters/getdoctors?q=Dahiliye", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((jso) => {
          dispatch({ type: "end", payload: jso.result.rows });
          return jso;
        })
        .catch((err) => {
          dispatch({ type: "err", err: true });
          console.log(err);
        });
    };

    fetcher();
  }, []);
*/
