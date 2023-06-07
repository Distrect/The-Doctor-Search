import React from "react";
import footerStyles from "../styles/Footer.module.css";

function Footer() {
  return (
    <div className={footerStyles["footer-container"]}>
      <span className={footerStyles["footer-text"]}>
        © 2023 Doctor Search System by EMU students
      </span>
    </div>
  );
}

export default Footer;
