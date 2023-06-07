import { GoogleMap, useJsApiLoader, InfoWindow } from "@react-google-maps/api";
import { useCallback, useContext } from "react";
import mapStyles from "../styles/Map.module.css";
import { doctorContext } from "./DoctorContext";

const containerStyle = {
  width: "calc(100% - 5rem)",
  height: "calc(100% - 5rem)",
  borderRadius: "10px",
};

const bounds = {
  north: 36,
  south: 34.5,
  east: 34.9,
  west: 31.8,
};

const options = {
  restriction: {
    latLngBounds: bounds,
    strictBounds: true,
  },
};

const center = {
  lat: 35.1264,
  lng: 33.4299,
};

function Map() {
  const {
    setMap,
    state: { loading, data },
  } = useContext(doctorContext);

  const { isLoaded } = useJsApiLoader({
    id: "kral",
    googleMapsApiKey: "AIzaSyAhTPZsaMk2ppD4CQY0UrFohrmF3MiwrFY",
  });

  const onLoad = useCallback(function callback(map) {
    map.setZoom(5);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  console.log(data);

  return (
    <div className={mapStyles["map-container"]}>
      {!loading && isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={options}
        >
          {/* <MarkerF
            position={{
              lat: parseFloat(data.doctorhospital[0].lat),
              lng: parseFloat(data.doctorhospital[0].lng),
            }}
          /> */}

          <InfoWindow
            position={{
              lat: parseFloat(data.doctorhospital[0].lat),
              lng: parseFloat(data.doctorhospital[0].lng),
            }}
          >
            <div>
              <a
                href={data.doctorhospital[0].url}
                rel="noreferrer"
                target="_blank"
              >
                {data.doctorhospital[0].hospitalName}
              </a>
            </div>
          </InfoWindow>
        </GoogleMap>
      )}
    </div>
  );
}

export default Map;
