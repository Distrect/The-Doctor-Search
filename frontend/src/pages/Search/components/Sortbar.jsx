import { useContext } from "react";
import sortStyle from "../styles/Sortbar.module.css";
import Input from "./Input";
import { RxHamburgerMenu } from "react-icons/rx";
import { dispatchContext, sandfContext } from "../../../context/Context";

function Sortbar({ modal: { setOpen } }) {
  const { loading, data, mobile } = useContext(sandfContext);
  const dispatch = useContext(dispatchContext);

  const handleOpen = (e) => {
    if (!mobile) return;
    const container = document.getElementById("modal-container");
    container.style.zIndex = 2;
    setOpen(true);
  };

  const handleSortChange = (e) => {
    dispatch({ type: "SORTCHANGE", sortValue: e.target.value.toLowerCase() });
  };

  return (
    <div className={sortStyle["sort-wrap"]}>
      <div className={sortStyle["dropdown"]}>
        <label htmlFor="drop">Sort By:</label>
        <select
          defaultValue={"name"}
          id="drop"
          className={sortStyle["sorter"]}
          disabled={loading}
          onChange={handleSortChange}
        >
          <option value="name">Name</option>
          <option value="rating">Rating</option>
          <option value="speciality">Speciality</option>
        </select>
      </div>
      <Input loading={loading} data={data} dispatch={dispatch} />
      <span className={sortStyle["hamburger"]}>
        <RxHamburgerMenu onClick={handleOpen} />
      </span>
    </div>
  );
}

export default Sortbar;
