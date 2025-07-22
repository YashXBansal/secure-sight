import { Video } from "lucide-react";

const IncidentPlayer = () => {
  return (
    <div className="flex flex-col h-full bg-slate-800/50 rounded-lg p-4 border border-slate-700">
      <div className="relative flex-grow w-full bg-black rounded-md overflow-hidden mb-4">
        <img
          src="https://placehold.co/1280x720/000000/FFFFFF?text=Main+Camera+Feed"
          alt="Main camera feed"
          width={1280}
          height={720}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm flex items-center space-x-2">
          <Video size={16} className="text-red-500" />
          <span>Camera 01 - Shop Floor A</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative bg-black rounded-md overflow-hidden">
          <img
            src="https://placehold.co/600x400/000000/FFFFFF?text=Camera+02"
            alt="Camera 2 feed"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs flex items-center space-x-1">
            <Video size={12} />
            <span>Camera 02 - Vault</span>
          </div>
        </div>
        <div className="relative bg-black rounded-md overflow-hidden">
          <img
            src="https://placehold.co/600x400/000000/FFFFFF?text=Camera+03"
            alt="Camera 3 feed"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs flex items-center space-x-1">
            <Video size={12} />
            <span>Camera 03 - Entrance</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IncidentPlayer;
