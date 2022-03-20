import { PlacesProvider } from "./context";
import { Home } from "./pages";

const MapsApp = () => {
  return (
    <PlacesProvider>
      <Home />
    </PlacesProvider>
  );
};

export default MapsApp;
