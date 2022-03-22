import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MapsApp from "./MapsApp";

import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaWNhb3MiLCJhIjoiY2wxMW5pMGplMndmZDNjcW9sNWkydnYzYyJ9.O5VDvBOQ2bLM9gQZ0UAzlQ";

if (!navigator.geolocation) {
  alert("Lo sentimos, tu navegador no tiene soporte para Geolocalización");
  throw new Error(
    "Lo sentimos, tu navegador no tiene soporte para Geolocalización"
  );
}

ReactDOM.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
  document.getElementById("root")
);
