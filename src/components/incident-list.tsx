"use client";

import { useState } from "react";
import IncidentListItem from "./incident-list-items";
import { AlertTriangle, CheckCircle } from "lucide-react";
import type { IncidentWithCamera } from "@/types/incident";

interface IncidentListProps {
  incidents: IncidentWithCamera[];
  onSelectIncident: (incident: IncidentWithCamera) => void;
  onResolveIncident: (incidentId: string) => void;
  selectedIncidentId?: string | null;
}

const IncidentList = ({
  incidents,
  onSelectIncident,
  onResolveIncident,
  selectedIncidentId,
}: IncidentListProps) => {
  const [view, setView] = useState<"unresolved" | "resolved">("unresolved");

  const unresolvedIncidents = incidents.filter((inc) => !inc.resolved);
  const resolvedIncidents = incidents.filter((inc) => inc.resolved);

  const activeList =
    view === "unresolved" ? unresolvedIncidents : resolvedIncidents;

  const handleResolve = (incidentId: string) => {
    fetch(`/api/incidents/${incidentId}/resolve`, { method: "PATCH" })
      .then((res) => {
        if (!res.ok) throw new Error("API call failed");
        onResolveIncident(incidentId);
      })
      .catch((err) => {
        console.error("Failed to resolve incident:", err);
      });
  };

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 h-full flex flex-col shadow-lg">
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center">
            {view === "unresolved" ? (
              <AlertTriangle className="mr-2 text-red-500" />
            ) : (
              <CheckCircle className="mr-2 text-green-500" />
            )}
            {activeList.length}{" "}
            {view === "unresolved" ? "Unresolved" : "Resolved"} Incidents
          </h2>
        </div>
        <div className="flex w-full bg-slate-900/70 rounded-md p-1">
          <button
            onClick={() => setView("unresolved")}
            className={`w-1/2 py-1 text-sm rounded ${
              view === "unresolved"
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-700/50"
            } transition-all`}
          >
            Unresolved
          </button>
          <button
            onClick={() => setView("resolved")}
            className={`w-1/2 py-1 text-sm rounded ${
              view === "resolved"
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-700/50"
            } transition-all`}
          >
            Resolved
          </button>
        </div>
      </div>

      <div className="overflow-y-auto flex-grow p-2">
        {activeList.length > 0 ? (
          <ul className="space-y-2">
            {activeList.map((incident) => (
              <IncidentListItem
                key={incident.id}
                incident={incident}
                isSelected={selectedIncidentId === incident.id}
                onSelect={() => onSelectIncident(incident)}
                onResolve={handleResolve}
              />
            ))}
          </ul>
        ) : (
          <div className="text-center py-10 text-slate-400">
            <p>No {view} incidents.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default IncidentList;
