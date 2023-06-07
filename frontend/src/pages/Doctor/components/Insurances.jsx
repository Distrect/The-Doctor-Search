import insuranceStyle from "../styles/Insurance.module.css";
import { hashInsurance } from "../../../constants/insurances";
import { doctorContext } from "./DoctorContext";
import { useContext } from "react";
import Loader from "../../../components/Loader";

function Insurances() {
  const {
    state: { loading, data },
  } = useContext(doctorContext);

  console.log(data);

  return (
    <div className={insuranceStyle["wrapper"]}>
      {loading ? (
        <Loader />
      ) : (
        data.doctorhospital[0].hospitalinsurances
          .filter((val) => {
            return typeof hashInsurance[val.insuranceId] === typeof "";
          })
          .map((val, i) => {
            return (
              <InsuranceImage
                key={i}
                src={hashInsurance[val.insuranceId]}
                val={val.insurance}
              />
            );
          })
      )}
    </div>
  );
}

function InsuranceImage({ src, val }) {
  return (
    <div className={insuranceStyle["image"]} src={src}>
      {val}
    </div>
  );
}
// function InsuranceImage({ src }) {
//   return <img className={insuranceStyle["image"]} src={src} />;
// }

export default Insurances;
