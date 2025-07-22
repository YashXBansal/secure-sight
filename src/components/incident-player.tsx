"use client";

import { Video, Camera as CameraIcon } from "lucide-react";
import type { IncidentWithCamera, Camera } from "@/types/incident";
import Image from "next/image";

interface CameraDisplayProps {
  camera: Camera | null;
  isMain: boolean;
  activeIncidentUrl?: string | null;
}

// A reusable component for a single camera display
const CameraView = ({
  camera,
  isMain,
  activeIncidentUrl,
}: CameraDisplayProps) => {
  if (!camera) return <div className="w-full h-full bg-black rounded-md"></div>;

  // If there's an active incident URL, use it. Otherwise, use the camera's live feed.
  const sourceUrl = activeIncidentUrl || camera.liveFeedUrl;
  const isVideo = sourceUrl.endsWith(".mp4");

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden shadow-inner-lg">
      {isVideo ? (
        <video
          key={sourceUrl}
          className="w-full h-full object-cover"
          src={sourceUrl}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <Image
          key={sourceUrl}
          src={sourceUrl}
          alt={camera.name}
          width={isMain ? 1280 : 600}
          height={isMain ? 720 : 400}
          className="w-full h-full object-cover animate-fade-in"
        />
      )}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
      <div className={`absolute bottom-2 left-2 md:bottom-4 md:left-4`}>
        <h3
          className={`font-bold text-white flex items-center space-x-2 ${
            isMain ? "text-xl" : "text-sm"
          }`}
        >
          <Video
            size={isMain ? 20 : 14}
            className={
              activeIncidentUrl
                ? "text-red-500 animate-pulse"
                : "text-green-500"
            }
          />
          <span>{camera.name}</span>
        </h3>
        {isMain && (
          <p className="text-slate-300 text-sm">
            <CameraIcon size={14} className="text-white" />
            {camera.location}
          </p>
        )}
      </div>
    </div>
  );
};

interface IncidentPlayerProps {
  mainCam: Camera | null;
  thumb1: Camera | null;
  thumb2: Camera | null;
  activeIncident: IncidentWithCamera | null;
}

const IncidentPlayer = ({
  mainCam,
  thumb1,
  thumb2,
  activeIncident,
}: IncidentPlayerProps) => {
  // Determine if the main display should show incident footage
  const mainDisplayIncidentUrl =
    activeIncident && activeIncident.camera.id === mainCam?.id
      ? activeIncident.thumbnailUrl
      : null;

  return (
    <div className="flex flex-col h-full bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 shadow-lg">
      <div className="flex-grow mb-4">
        <CameraView
          camera={mainCam}
          isMain={true}
          activeIncidentUrl={mainDisplayIncidentUrl}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-32 md:h-40">
        <CameraView camera={thumb1} isMain={false} />
        <CameraView camera={thumb2} isMain={false} />
      </div>
    </div>
  );
};
export default IncidentPlayer;
