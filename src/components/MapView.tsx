import { useContext } from "react";
import { PlacesContext } from "../context";
import { Loading } from "./Loading";

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <>
      {isLoading && <Loading />}
      <p>{userLocation?.join(",")}</p>
    </>
  );
};
