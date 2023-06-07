import searchStyles from "../pages/Search/styles/Search.module.css";

function Loader() {
  return (
    <div className={searchStyles["loader"]}>
      <div className={searchStyles["loader-inner"]}></div>
    </div>
  );
}

export default Loader;
