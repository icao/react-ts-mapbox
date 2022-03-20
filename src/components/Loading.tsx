import { LocationIcon } from "./LocationIcon";

export const Loading = () => {
  return (
    <div className="w-full h-screen bg-zinc-50 flex justify-center items-center overflow-hidden">
      <div className="spinner">
        <div className="pulse bg-next-blue w-20 h-20 rounded-full flex items-center justify-center">
          <div className="w-10 h-10">
            <LocationIcon color="#ffffff" />
          </div>
        </div>
      </div>
    </div>
  );
};
