"use client";

import { Video, Camera as CameraIcon } from "lucide-react";
import type { IncidentWithCamera, Camera } from "@/types/incident";

interface IncidentPlayerProps {
  incident: IncidentWithCamera | null;
  allCameras: Camera[];
}

const IncidentPlayer = ({ incident, allCameras }: IncidentPlayerProps) => {
  // A default "live feed" video for when no specific incident is selected.
  const liveFeedUrl =
    "https://assets.mixkit.co/videos/preview/mixkit-security-camera-of-a-courtyard-41641-large.mp4";

  // Determine the video source: selected incident's thumbnail or the live feed.
  // We will use a GIF for the main player as well for simplicity and performance.
  const videoSource = incident ? incident.thumbnailUrl : liveFeedUrl;
  const isVideo = videoSource.endsWith(".mp4");

  return (
    <div className="flex flex-col h-full bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 shadow-lg">
      <div className="relative flex-grow w-full bg-black rounded-lg overflow-hidden mb-4 shadow-inner-lg">
        {isVideo ? (
          <video
            key={videoSource} // Use key to force re-render on source change
            className="w-full h-full object-cover"
            src={videoSource}
            autoPlay
            loop
            muted
            playsInline // Important for mobile browsers
          />
        ) : (
          <img
            key={videoSource}
            src={videoSource}
            alt={incident?.type || "Live Feed"}
            width={1280}
            height={720}
            className="w-full h-full object-cover animate-fade-in"
          />
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <Video size={20} className="text-red-500 animate-pulse" />
            <span>{incident?.camera.name || "Live Feed"}</span>
          </h3>
          <p className="text-slate-300 text-sm">
            {incident?.camera.location || "Main Courtyard"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {allCameras.slice(0, 2).map((cam) => (
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
