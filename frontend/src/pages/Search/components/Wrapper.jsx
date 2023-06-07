import CardContainer from "./CardContainer";
import Pagination from "./Pagination";
import Context from "../../../context/ContextWrapper";
import FilterSortWrapper from "./FilterSortWrapper";

function Wrapper() {
  return (
    <Context>
      <FilterSortWrapper />
      <CardContainer />
      <Pagination />
    </Context>
  );
}

export default Wrapper;
