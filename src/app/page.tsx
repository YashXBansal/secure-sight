"use client";

import { useState, useEffect } from "react";
import type { IncidentWithCamera } from "@/types/incident";
import Navbar from "@/components/navbar";
import IncidentPlayer from "@/components/incident-player";
import IncidentList from "@/components/incident-list";

export default function Home() {
  const [allIncidents, setAllIncidents] = useState<IncidentWithCamera[]>([]);
  const [selectedIncident, setSelectedIncident] =
    useState<IncidentWithCamera | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllIncidents = async () => {
      try {
        const [unresolvedRes, resolvedRes] = await Promise.all([
          fetch("/api/incidents?resolved=false"),
          fetch("/api/incidents?resolved=true"),
        ]);

        if (!unresolvedRes.ok || !resolvedRes.ok) {
          throw new Error("Failed to fetch incidents from API");
        }

        const unresolved: IncidentWithCamera[] = await unresolvedRes.json();
        const resolved: IncidentWithCamera[] = await resolvedRes.json();

        const combinedIncidents = [...unresolved, ...resolved].sort(
          (a, b) =>
            new Date(b.tsStart).getTime() - new Date(a.tsStart).getTime()
        );

        setAllIncidents(combinedIncidents);
        setSelectedIncident(unresolved[0] || resolved[0] || null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllIncidents();
  }, []);

  const handleResolveIncident = (incidentId: string) => {
    setAllIncidents((prevIncidents) =>
      prevIncidents.map((inc) =>
        inc.id === incidentId ? { ...inc, resolved: true } : inc
      )
    );
    if (selectedIncident?.id === incidentId) {
      const nextUnresolved = allIncidents.filter(
        (i) => !i.resolved && i.id !== incidentId
      )[0];
      setSelectedIncident(
        nextUnresolved ||
          allIncidents.filter((i) => i.id !== incidentId)[0] ||
          null
      );
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-900">
      <Navbar />
      <div className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-full text-slate-400">
            Loading Dashboard...
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-full text-red-400">
            Error: {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 h-full">
            <div className="lg:col-span-2">
              <IncidentPlayer
                incident={selectedIncident}
                allCameras={Array.from(
                  new Map(
                    allIncidents
                      .map((inc) => inc.camera)
                      .map((cam) => [cam.id, cam])
                  ).values()
                )}
              />
            </div>
            <div className="lg:col-span-1">
              <IncidentList
                incidents={allIncidents}
                onSelectIncident={setSelectedIncident}
                onResolveIncident={handleResolveIncident}
                selectedIncidentId={selectedIncident?.id}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
