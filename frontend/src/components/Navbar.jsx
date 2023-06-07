import navbarStyles from "../styles/Navbar.module.css";
import logo from "../assets/logo.webp";

localStorage.removeItem("scrapped");

function Navbar() {
  const hiddenScrap = async (e) => {
    const isScrapped = JSON.parse(localStorage.getItem("scrapped"));

    if (isScrapped === 1) return;
    await fetch("http://localhost:2000/scrap")
      .then((res) => res.json)
      .then((res) => {
        window.localStorage.setItem("scrapped", "1");
      });
  };

  return (
    <div className={navbarStyles["navbar-container"]}>
      <div className={navbarStyles["logo-wrapper"]}>
        <img
          src={logo}
          alt="logo"
          className={navbarStyles["logo"]}
          onClick={hiddenScrap}
        />
      </div>
      <ul className={navbarStyles["navbar-link-container"]}>
        <li>
          <a href="/" className={navbarStyles["link"]}>
            Home
          </a>
        </li>
        <li>
          <a href="/doctor" className={navbarStyles["link"]}>
            Doctors
          </a>
        </li>
      </ul>
      {/* <div className={navbarStyles["empty"]}></div> */}
    </div>
  );
}

export default Navbar;
