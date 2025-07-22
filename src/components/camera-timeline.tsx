// components/CameraTimeline.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import type { IncidentWithCamera, Camera } from "@/types/incident";
import {
  ShieldAlert,
  UserCheck,
  Video,
  TrafficCone,
  AlertCircle,
  PlayCircle,
  CheckCircle,
} from "lucide-react";

interface CameraTimelineProps {
  incidents: IncidentWithCamera[];
  cameras: Camera[];
  onSelectIncident: (incident: IncidentWithCamera) => void;
  selectedIncidentId?: string | null;
}

// Helper for professional timeline styles
const getIncidentTypeDetails = (type: string, resolved: boolean) => {
  if (resolved) {
    return {
      Icon: CheckCircle,
      style: "bg-green-500/20 text-green-400 border-green-500/50",
    };
  }
  switch (type) {
    case "Unauthorised Access":
      return {
        Icon: ShieldAlert,
        style: "bg-orange-500/20 text-orange-300 border-orange-500/50",
      };
    case "Gun Threat":
      return {
        Icon: AlertCircle,
        style: "bg-red-500/20 text-red-300 border-red-500/50",
      };
    case "Face Recognised":
      return {
        Icon: UserCheck,
        style: "bg-blue-500/20 text-blue-300 border-blue-500/50",
      };
    case "Traffic Congestion":
      return {
        Icon: TrafficCone,
        style: "bg-yellow-500/20 text-yellow-300 border-yellow-500/50",
      };
    default:
      return {
        Icon: ShieldAlert,
        style: "bg-slate-500/20 text-slate-300 border-slate-500/50",
      };
  }
};

// Helper for mobile SVG timeline styles
const getSvgIncidentTypeDetails = (type: string, resolved: boolean) => {
  if (resolved) {
    return { color: "fill-green-500", stroke: "stroke-green-400" };
  }
  switch (type) {
    case "Unauthorised Access":
      return { color: "fill-orange-400", stroke: "stroke-orange-300" };
    case "Gun Threat":
      return { color: "fill-red-500", stroke: "stroke-red-400" };
    case "Face Recognised":
      return { color: "fill-blue-400", stroke: "stroke-blue-300" };
    default:
      return { color: "fill-slate-400", stroke: "stroke-slate-300" };
  }
};

const CameraTimeline = ({
  incidents,
  cameras,
  onSelectIncident,
  selectedIncidentId,
}: CameraTimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
  const [isDragging, setIsDragging] = useState(false);
  const [scrubberPosition, setScrubberPosition] = useState(15);
  const [timelineWidth, setTimelineWidth] = useState(800);

  // Check screen size on mount and on resize to set the view mode
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) setViewMode("mobile");
      else if (width < 1280) setViewMode("tablet");
      else setViewMode("desktop");
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const ref = viewMode === "mobile" ? svgRef : timelineRef;
    if (ref.current) {
      setTimelineWidth(ref.current.clientWidth);
    }
  }, [viewMode, timelineWidth]);

  const timeToPercent = (date: Date) =>
    ((date.getHours() * 60 + date.getMinutes()) / 1440) * 100;

  const allIncidentMarkers = incidents.map((inc) => ({
    ...inc,
    position: timeToPercent(new Date(inc.tsStart)),
  }));

  const handleInteractionStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateScrubberPosition(e);
  };

  const handleInteractionMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    updateScrubberPosition(e);
  };

  const updateScrubberPosition = (e: React.MouseEvent | React.TouchEvent) => {
    const ref = viewMode === "mobile" ? svgRef : timelineRef;
    if (!ref.current) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const bounds = ref.current.getBoundingClientRect();
    const newPercent = Math.max(
      0,
      Math.min(100, ((clientX - bounds.left) / bounds.width) * 100)
    );
    setScrubberPosition(newPercent);
  };

  const handleInteractionEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (allIncidentMarkers.length > 0) {
      const closestIncident = allIncidentMarkers.reduce((prev, curr) =>
        Math.abs(curr.position - scrubberPosition) <
        Math.abs(prev.position - scrubberPosition)
          ? curr
          : prev
      );
      onSelectIncident(closestIncident);
    }
  };

  useEffect(() => {
    const selectedMarker = allIncidentMarkers.find(
      (m) => m.id === selectedIncidentId
    );
    if (selectedMarker) {
      setScrubberPosition(selectedMarker.position);
    }
  }, [selectedIncidentId]);

  const renderTimelineContent = () => {
    if (viewMode === "mobile") {
      // =================== MOBILE SVG TIMELINE ===================
      return (
        <svg
          ref={svgRef}
          width="100%"
          height="60"
          className="cursor-pointer"
          onMouseDown={handleInteractionStart}
          onTouchStart={handleInteractionStart}
        >
          <line
            x1="0"
            y1="30"
            x2="100%"
            y2="30"
            stroke="#475569"
            strokeWidth="2"
          />
          {Array.from({ length: 13 }).map((_, i) => (
            <g key={i}>
              <line
                x1={`${((i * 2) / 24) * 100}%`}
                y1="25"
                x2={`${((i * 2) / 24) * 100}%`}
                y2="35"
                stroke="#475569"
                strokeWidth="1"
              />
              <text
                x={`${((i * 2) / 24) * 100}%`}
                y="55"
                fill="#94a3b8"
                fontSize="12"
                textAnchor="middle"
              >
                {(i * 2).toString().padStart(2, "0")}
              </text>
            </g>
          ))}
          {allIncidentMarkers.map((marker) => {
            const { color, stroke } = getSvgIncidentTypeDetails(
              marker.type,
              marker.resolved
            );
            const isSelected = marker.id === selectedIncidentId;
            return (
              <g
                key={marker.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectIncident(marker);
                }}
              >
                <circle
                  cx={`${marker.position}%`}
                  cy="30"
                  r={isSelected ? "8" : "5"}
                  className={`${color} ${stroke} transition-all`}
                  strokeWidth="2"
                />
                {isSelected && (
                  <circle
                    cx={`${marker.position}%`}
                    cy="30"
                    r="12"
                    fill="none"
                    className={stroke}
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="100"
                      to="0"
                      dur="5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}
          <g
            transform={`translate(${
              (scrubberPosition / 100) * timelineWidth
            }, 0)`}
            className="transition-transform duration-200 ease-out"
          >
            <line y1="10" y2="50" stroke="#38bdf8" strokeWidth="2" />
            <circle cy="10" r="5" fill="#38bdf8" />
            <circle cy="50" r="5" fill="#38bdf8" />
          </g>
        </svg>
      );
    }

    // =================== TABLET & DESKTOP PROFESSIONAL TIMELINE ===================
    return (
      <div className="flex w-full">
        <div className="w-32 md:w-40 pr-4 border-r border-slate-700/50 flex-shrink-0">
          <p className="text-sm font-semibold text-slate-200 h-10 flex items-end pb-2">
            Camera List
          </p>
          {cameras.map((camera) => (
            <div
              key={camera.id}
              className="h-12 flex items-center text-sm text-slate-400 truncate"
            >
              <Video size={14} className="mr-2 flex-shrink-0" /> {camera.name}
            </div>
          ))}
        </div>
        <div
          className="flex-grow relative overflow-x-auto"
          style={{
            maskImage: "linear-gradient(to right, black 95%, transparent 100%)",
          }}
        >
          <div
            ref={timelineRef}
            className="relative min-w-[1200px]"
            onMouseDown={handleInteractionStart}
            onTouchStart={handleInteractionStart}
          >
            <div className="h-10 border-b border-slate-700/50 flex items-end">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[calc(100%/24)] text-center text-xs text-slate-500 pb-2 border-l border-slate-800 flex-shrink-0"
                >
                  {i.toString().padStart(2, "0")}:00
                </div>
              ))}
            </div>
            {cameras.map((camera) => (
              <div
                key={camera.id}
                className="h-12 border-b border-slate-800 relative"
              >
                {allIncidentMarkers
                  .filter((inc) => inc.camera.id === camera.id)
                  .map((incident) => {
                    const { Icon, style } = getIncidentTypeDetails(
                      incident.type,
                      incident.resolved
                    );
                    return (
                      <div
                        key={incident.id}
                        className={`absolute top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-xs flex items-center cursor-pointer border whitespace-nowrap transition-transform duration-200 hover:scale-105 ${style}`}
                        style={{ left: `${incident.position}%` }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectIncident(incident);
                        }}
                      >
                        <Icon size={12} className="mr-1.5" />
                        {incident.resolved ? "Resolved" : incident.type}
                      </div>
                    );
                  })}
              </div>
            ))}
            <div
              className="absolute top-0 h-full w-0.5 bg-yellow-400 cursor-ew-resize transition-all duration-200 ease-out"
              style={{ left: `${scrubberPosition}%` }}
            >
              <div className="absolute -top-2.5 -left-2.5 w-5 h-5 bg-yellow-400 rounded-full ring-4 ring-slate-900"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="bg-slate-900/70 rounded-lg p-4 border border-slate-700/50 shadow-2xl mt-6 backdrop-blur-sm"
      onMouseMove={handleInteractionMove}
      onMouseUp={handleInteractionEnd}
      onMouseLeave={handleInteractionEnd}
      onTouchMove={handleInteractionMove}
      onTouchEnd={handleInteractionEnd}
    >
      <div className="flex items-center space-x-4 mb-4 text-slate-300">
        <button className="p-1 hover:text-white">
          <PlayCircle size={20} />
        </button>
        <p className="text-sm">03:12:37 (25-Jun-2025)</p>
      </div>
      {renderTimelineContent()}
    </div>
  );
};

export default CameraTimeline;
