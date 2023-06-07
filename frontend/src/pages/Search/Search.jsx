import searchStyles from "./styles/Search.module.css";
import hero from "../../assets/search-hero.webp";
import Wrapper from "./components/Wrapper";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Search() {
  return (
    <div className="container">
      <Navbar />
      <div className={searchStyles["wrapper"]}>
        <img src={hero} alt="hero" className={searchStyles["hero-img"]} />
        <Wrapper />
      </div>
      <Footer />
    </div>
  );
}
export default Search;
