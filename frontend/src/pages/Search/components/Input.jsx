import { useEffect, useReducer, useRef } from "react";
import { debouncer, getDoctors } from "../../../util";
import { initialState, newReducer } from "../../../reducer/reducer";
import Loader from "../../../components/Loader";
import sortStyle from "../styles/Sortbar.module.css";

function Input() {
  const [state, disp] = useReducer(newReducer, {
    ...initialState,
    loading: false,
    trigger: "",
  });

  const ref = useRef(null);

  const handleChange = debouncer((e) => {
    const newQuerry = e.target.value.trim();
    if (!newQuerry) {
      disp({ type: "CLEAR" });
      return;
    }
    disp({ type: "TRIGGER", trigger: newQuerry });
  }, 200);

  useEffect(() => {
    const fetchDoctros = async () => {
      try {
        const result = await getDoctors(
          { querry: state.trigger },
          "/search/search"
        );
        console.log(result);
        disp({ type: "END", data: result.result });
      } catch (error) {
        console.log(error);
        disp({ type: "ERROR", err: error });
      }
    };
    state.trigger && fetchDoctros();

    const handleClick = (e) => {
      if (e.target.contains(ulEl) || ulEl.parentElement.contains(e.target))
        return;
      ulEl.style.display = "none";
    };

    const ulEl = ref.current;

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [state.trigger]);

  console.log(state.data);

  return (
    <div className={sortStyle["input-container"]}>
      <input type="text" placeholder="Search Doctor" onChange={handleChange} />
      <ul ref={ref} className={sortStyle["input-dropdown"]}>
        {state.loading ? (
          <Loader />
        ) : state.data || state.data?.length > 0 ? (
          state.data.map((val, i) => <ListItem key={i} val={val} />)
        ) : (
          <li>
            <a href="#">Empty</a>
          </li>
        )}
      </ul>
      <button className={sortStyle["search-button"]}>Search</button>
    </div>
  );
}

function ListItem({ val }) {
  //href={"/viewdoctor/" + val.doctorId}
  return (
    <li>
      <a href={"/viewdoctor/" + val.doctorId}>
        {val.name + " " + (val.middlename || "") + " " + val.surname}
      </a>
    </li>
  );
}

export default Input;
