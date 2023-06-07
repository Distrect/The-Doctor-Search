import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { DoctorContext } from "./components/DoctorContext";
import doctorStyles from "./styles/Doctor.module.css";
import DoctorCard from "./components/DoctorCard";
import Map from "./components/Map";
import Insurances from "./components/Insurances";

function Doctor() {
  const { id } = useParams();

  return (
    <div className="container">
      <Navbar />

      <DoctorContext doctorId={+id}>
        <div className={doctorStyles["wrapper"]}>
          <DoctorCard />
          <Insurances />
          <Map />
        </div>
      </DoctorContext>

      <Footer />
    </div>
  );
}

export default Doctor;
