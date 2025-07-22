"use client";

import { useState, useEffect } from "react";
import IncidentListItem from "./incident-list-items";
import { AlertTriangle, CheckCircle } from "lucide-react";

export type IncidentWithCamera = {
  id: string;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  resolved: boolean;
  camera: { id: string; name: string; location: string };
};

const IncidentList = () => {
  const [incidents, setIncidents] = useState<IncidentWithCamera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/incidents?resolved=false");
        if (!response.ok) throw new Error("Failed to fetch incidents");
        const data: IncidentWithCamera[] = await response.json();
        setIncidents(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchIncidents();
  }, []);

  const handleResolve = (incidentId: string) => {
    const originalIncidents = [...incidents];
    setIncidents((currentIncidents) =>
      currentIncidents.filter((inc) => inc.id !== incidentId)
    );
    fetch(`/api/incidents/${incidentId}/resolve`, { method: "PATCH" }).catch(
      (err) => {
        console.error("Failed to resolve incident:", err);
        setIncidents(originalIncidents);
      }
    );
  };

  if (loading)
    return (
      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 h-full flex items-center justify-center">
        <p className="text-slate-400">Loading incidents...</p>
      </div>
    );
  if (error)
    return (
      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 h-full flex items-center justify-center">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 h-full flex flex-col">
      <div className="p-4 border-b border-slate-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <AlertTriangle className="mr-2 text-red-500" />
          {incidents.length} Unresolved Incidents
        </h2>
        <a
          href="#"
          className="text-sm text-slate-400 hover:text-white flex items-center"
        >
          <CheckCircle size={14} className="mr-1 text-green-500" />4 resolved
        </a>
      </div>
      <div className="overflow-y-auto flex-grow p-2">
        {incidents.length > 0 ? (
          <ul className="space-y-2">
            {incidents.map((incident) => (
              <IncidentListItem
                key={incident.id}
                incident={incident}
                onResolve={handleResolve}
              />
            ))}
          </ul>
        ) : (
          <div className="text-center py-10">
            <p className="text-slate-400">No unresolved incidents.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default IncidentList;
