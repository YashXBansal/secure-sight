"use client";

import { useState } from "react";
import {
  ShieldAlert,
  UserCheck,
  Video,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import type { IncidentWithCamera } from "@/types/incident";

const formatDateTime = (start: string) => {
  const startDate = new Date(start);
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "2-digit",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const dateStr = startDate.toLocaleDateString("en-US", dateOptions);
  const timeStr = startDate.toLocaleTimeString("en-US", timeOptions);
  return `${dateStr}, ${timeStr}`;
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
  isSelected: boolean;
  onSelect: () => void;
  onResolve: (id: string) => void;
}

const IncidentListItem = ({
  incident,
  isSelected,
  onSelect,
  onResolve,
}: IncidentListItemProps) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [imgSrc, setImgSrc] = useState(incident.thumbnailUrl);
  const { Icon, color } = getIncidentTypeDetails(incident.type);

  const handleResolveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFadingOut(true);
    setTimeout(() => {
      onResolve(incident.id);
    }, 300);
  };

  return (
    <li
      onClick={onSelect}
      className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-all duration-300 
                 ${isFadingOut ? "fade-out" : ""} 
                 ${
                   isSelected
                     ? "bg-blue-600/30 ring-2 ring-blue-500"
                     : "bg-slate-800 hover:bg-slate-700/50"
                 }`}
    >
      <img
        src={imgSrc}
        alt={incident.type}
        width={96}
        height={64}
        className="w-24 h-16 object-cover rounded-md bg-slate-700 flex-shrink-0"
        onError={() => {
          setImgSrc("https://placehold.co/96x64/1e293b/ffffff?text=No+Img");
        }}
      />
      <div className="flex-grow min-w-0">
        <div className={`flex items-center text-sm font-semibold ${color}`}>
          <Icon size={16} className="mr-2 flex-shrink-0" />
          <span className="truncate">{incident.type}</span>
        </div>
        <div className="text-xs text-slate-400 flex items-center mt-1 truncate">
          <Video size={12} className="mr-1.5 flex-shrink-0" />
          <span>{incident.camera.location}</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          {formatDateTime(incident.tsStart)}
        </p>
      </div>
      <div className="flex-shrink-0">
        {incident.resolved ? (
          <span className="text-sm text-green-500 font-semibold flex items-center">
            <CheckCircle size={16} className="mr-1" />
            Resolved
          </span>
        ) : (
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
        )}
      </div>
    </li>
  );
};
export default IncidentListItem;
