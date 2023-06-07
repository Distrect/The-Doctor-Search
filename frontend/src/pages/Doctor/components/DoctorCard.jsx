import { useContext } from "react";
import { doctorContext } from "./DoctorContext";
import cardStyles from "../styles/DoctorCard.module.css";
import Loader from "../../../components/Loader";
import { CiMail, CiPhone } from "react-icons/ci";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaHospitalAlt } from "react-icons/fa";
import { AiFillPhone, AiFillMail } from "react-icons/ai";
import { reduceTitles } from "../../../util";

const handleRting = (rating) => {
  const rat = (rating + "").split(".");
  const arr = [];
  for (let i = 0; i < +rat[0]; i++) {
    arr.push(<BsStarFill style={{ color: "gold" }} key={i} />);
  }

  +rat[1] > 5 &&
    arr.push(<BsStarHalf style={{ color: "gold" }} key={"kral"} />);

  return arr;
};

function DoctorCard() {
  const {
    state: { loading, data },
  } = useContext(doctorContext);

  console.log(loading, data);
  console.log(loading === false && reduceTitles(data.doctortitles));

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={cardStyles["card-container"]}>
          <div className={cardStyles["image-container"]}>
            <img
              className={cardStyles["image"]}
              src={data.imageSrc}
              alt="Osman Beyaz Ansına"
              title="Osman Beyaz Ansına"
            />
          </div>
          <div className={cardStyles["info-container"]}>
            <div className={cardStyles["info-row"]}>
              <h3>
                {reduceTitles(data.doctortitles) +
                  " " +
                  (data.name || "") +
                  " " +
                  (data.middlename || "") +
                  " " +
                  (data.surname || "")}
              </h3>
              <div className={cardStyles["contact-container"]}>
                <a href="tel:0542860152">
                  <CiPhone className={cardStyles["icon"]} />
                </a>
                <a href="mailto:samet@gmail.com">
                  <CiMail className={cardStyles["icon"]} />
                </a>
              </div>
            </div>
            <div className={cardStyles["info-row"]}>
              <p>{data.speciality}</p>
            </div>
            <div className={cardStyles["info-row"]}>
              <span className={cardStyles["rating"]}>
                {handleRting(data.rating)}
              </span>
            </div>
            <div className={cardStyles["info-row"]}>
              <div className={cardStyles["detail-container"]}>
                <span className={cardStyles["inf"]}>
                  <AiFillPhone />
                  <span className={cardStyles["text"]}>{data.phone}</span>
                </span>
                <span className={cardStyles["inf"]}>
                  <AiFillMail />
                  <span className={cardStyles["text"]}>{data.email}</span>
                </span>
                <span className={cardStyles["inf"]}>
                  <FaHospitalAlt />
                  <span className={cardStyles["text"]}>
                    {data.doctorhospital[0].hospitalName + " Hastanesi"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorCard;
