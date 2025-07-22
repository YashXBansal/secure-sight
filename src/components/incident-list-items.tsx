"use client";

import { useState } from "react";
import { ShieldAlert, UserCheck, Video, ChevronRight } from "lucide-react";
import type { IncidentWithCamera } from "./incident-list";

const formatDateTime = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const dateStr = startDate.toLocaleDateString("en-GB", dateOptions);
  const startTimeStr = startDate.toLocaleTimeString("en-GB", timeOptions);
  const endTimeStr = endDate.toLocaleTimeString("en-GB", timeOptions);
  return `${startTimeStr} - ${endTimeStr} on ${dateStr}`;
};

const getIncidentTypeDetails = (type: string) => {
  switch (type) {
    case "Unauthorised Access":
      return { Icon: ShieldAlert, color: "text-orange-400" };
    case "Gun Threat":
      return { Icon: ShieldAlert, color: "text-red-500" };
    case "Face Recognised":
      return { Icon: UserCheck, color: "text-blue-400" };
    default:
      return { Icon: ShieldAlert, color: "text-slate-400" };
  }
};

interface IncidentListItemProps {
  incident: IncidentWithCamera;
  onResolve: (id: string) => void;
}

const IncidentListItem = ({ incident, onResolve }: IncidentListItemProps) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [imgSrc, setImgSrc] = useState(incident.thumbnailUrl);
  const { Icon, color } = getIncidentTypeDetails(incident.type);

  const handleResolveClick = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onResolve(incident.id);
    }, 300);
  };

  return (
    <li
      className={`flex items-center space-x-3 p-2 rounded-lg bg-slate-800 hover:bg-slate-700/50 transition-all duration-300 ${
        isFadingOut ? "fade-out" : ""
      }`}
    >
      <img
        src={imgSrc}
        alt={incident.type}
        width={96}
        height={64}
        className="w-24 h-16 object-cover rounded-md bg-slate-700"
        onError={() => {
          setImgSrc("https://placehold.co/96x64/1e293b/ffffff?text=No+Img");
        }}
      />
      <div className="flex-grow">
        <div className={`flex items-center text-sm font-semibold ${color}`}>
          <Icon size={16} className="mr-2" />
          <span>{incident.type}</span>
        </div>
        <div className="text-xs text-slate-400 flex items-center mt-1">
          <Video size={12} className="mr-1.5" />
          <span>{incident.camera.location}</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          {formatDateTime(incident.tsStart, incident.tsEnd)}
        </p>
      </div>
      <button
        onClick={handleResolveClick}
        className="text-sm text-blue-400 hover:text-white font-semibold flex items-center group"
      >
        <span>Resolve</span>
        <ChevronRight
          size={16}
          className="ml-1 transition-transform group-hover:translate-x-1"
        />
      </button>
    </li>
  );
};
export default IncidentListItem;
