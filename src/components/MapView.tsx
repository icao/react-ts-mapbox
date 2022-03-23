import { Map } from "mapbox-gl";
import { useContext, useLayoutEffect, useRef } from "react";
import { MapContext, PlacesContext } from "../context";
import { Loading } from "./Loading";

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const {setMap} = useContext(MapContext)
  const mapContainer = useRef<HTMLDivElement>(null);


  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapContainer.current!, // container ID
        style: "mapbox://styles/mapbox/dark-v10", // style URL
        // style: "mapbox://styles/mapbox/light-v10", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      });

      setMap(map);
    }
  }, [isLoading]);

  return (
    <div ref={mapContainer} className="bg-zinc-800 w-full h-screen">
      {isLoading && <Loading />}
      <p>{userLocation?.join(",")}</p>
    </div>
  );
};
