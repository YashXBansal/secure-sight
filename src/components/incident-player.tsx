"use client";

import { Video, Camera as CameraIcon } from "lucide-react";
import type { IncidentWithCamera, Camera } from "@/types/incident";

interface IncidentPlayerProps {
  incident: IncidentWithCamera | null;
  allCameras: Camera[];
}

const IncidentPlayer = ({ incident, allCameras }: IncidentPlayerProps) => {
  if (!incident) {
    return (
      <div className="flex justify-center items-center h-full bg-slate-800/50 rounded-lg p-4 border border-slate-700 text-slate-400">
        Select an incident to view details.
      </div>
    );
  }

  const otherCameras = allCameras
    .filter((cam) => cam.id !== incident.camera.id)
    .slice(0, 2);

  return (
    <div className="flex flex-col h-full bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 shadow-lg">
      <div className="relative flex-grow w-full bg-black rounded-lg overflow-hidden mb-4 shadow-inner-lg">
        <img
          src={incident.thumbnailUrl.replace("600x400", "1280x720")}
          alt={incident.type}
          key={incident.id}
          width={1280}
          height={720}
          className="w-full h-full object-cover animate-fade-in"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <Video size={20} className="text-red-500 animate-pulse" />
            <span>{incident.camera.name}</span>
          </h3>
          <p className="text-slate-300 text-sm">{incident.camera.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {otherCameras.map((cam) => (
          <div
            key={cam.id}
            className="relative bg-black rounded-md overflow-hidden border border-slate-700/50"
          >
            <img
              src={`https://placehold.co/600x400/000000/FFFFFF?text=${encodeURIComponent(
                cam.name
              )}`}
              alt={`${cam.name} feed`}
              width={600}
              height={400}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs flex items-center space-x-1">
              <CameraIcon size={12} />
              <span>{cam.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default IncidentPlayer;
