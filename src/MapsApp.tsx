import { MapProvider, PlacesProvider } from "./context";
import { Home } from "./pages";

const MapsApp = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <Home />
      </MapProvider>
    </PlacesProvider>
  );
};

export default MapsApp;
