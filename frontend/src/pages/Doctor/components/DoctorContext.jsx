import { createContext, useEffect, useReducer, useState } from "react";
import { initialState, reducer } from "../../../reducer/reducer";

const doctorContext = createContext();

const getDoctor = async (doctorId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    console.log("http://localhost:2000/doctor/" + doctorId);
    const response = await fetch("http://localhost:2000/doctor/" + doctorId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

function DoctorContext({ children, doctorId }) {
  const [map, setMap] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
  });

  useEffect(() => {
    const fetchd = async () => {
      try {
        const doctor = await getDoctor(doctorId);
        dispatch({ type: "end", payload: doctor.result });
        console.log(doctor);
      } catch (error) {
        dispatch({ type: "error", err: true });
        console.log(error);
      }
    };
    fetchd();
  }, []);

  return (
    <doctorContext.Provider value={{ state, setMap }}>
      {children}
    </doctorContext.Provider>
  );
}

export { DoctorContext, doctorContext };
