import containerStyles from "../styles/CardContainer.module.css";
import { CiMail, CiPhone } from "react-icons/ci";

function Card({ doctor }) {
  const {
    doctorId,
    name,
    middlename,
    surname,
    speciality,
    doctortitles,
    phone,
    email,
    imageSrc,
  } = doctor;

  const title = doctortitles.reduce(
    (acc, val) => (!acc ? val.title : " " + val.title),
    ""
  );

  return (
    <div className={containerStyles["card"]}>
      <div className={containerStyles["card-body"]}>
        <div className={containerStyles["image-wrapper"]}>
          <img src={imageSrc} alt="Doctor Image" loading="lazy" />
        </div>
        <div className={containerStyles["info-wrapper"]}>
          <a href={"/viewdoctor/" + doctorId}>
            <h3>
              {(title || "") +
                " " +
                (name || "") +
                " " +
                (middlename || "") +
                " " +
                (surname || "")}
            </h3>
            <span>{speciality}</span>
          </a>
        </div>
        <div className={containerStyles["contact"]}>
          <a href={"mailto:" + email}>
            <CiPhone />
          </a>
          <a href={"tel:" + phone}>
            <CiMail />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
