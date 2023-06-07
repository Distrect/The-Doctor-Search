import Sortbar from "./Sortbar";
import MemoizedFilterContainer from "./FilterContainer";
import { useContext, useState } from "react";
import { dispatchContext, sandfContext } from "../../../context/Context";
import { createPortal } from "react-dom";

function FilterSortWrapper() {
  const [open, setOpen] = useState(false);
  const { mobile, loading } = useContext(sandfContext);
  const contextDispatch = useContext(dispatchContext);
  return (
    <>
      {!mobile ? (
        <MemoizedFilterContainer
          context={{ loading, contextDispatch }}
          modal={{ open, setOpen }}
        />
      ) : (
        createPortal(
          <MemoizedFilterContainer
            context={{ loading, contextDispatch }}
            modal={{ open, setOpen }}
          />,
          document.getElementById("modal-container")
        )
      )}
      <Sortbar modal={{ open, setOpen }} />
    </>
  );
}

export default FilterSortWrapper;
