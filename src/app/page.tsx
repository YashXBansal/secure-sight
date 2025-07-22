// app/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/navbar";
import IncidentPlayer from "@/components/incident-player";
import IncidentList from "@/components/incident-list";
import CameraTimeline from "@/components/camera-timeline";
import type { IncidentWithCamera, Camera } from "@/types/incident";

export default function Home() {
  const [allIncidents, setAllIncidents] = useState<IncidentWithCamera[]>([]);
  const [allCameras, setAllCameras] = useState<Camera[]>([]);
  const [activeIncident, setActiveIncident] =
    useState<IncidentWithCamera | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mainDisplayCam, setMainDisplayCam] = useState<Camera | null>(null);
  const [thumb1Cam, setThumb1Cam] = useState<Camera | null>(null);
  const [thumb2Cam, setThumb2Cam] = useState<Camera | null>(null);

  const handleSelectIncident = useCallback(
    (incident: IncidentWithCamera) => {
      setActiveIncident(incident);
      const incidentCam = incident.camera;
      const otherCams = allCameras.filter((c) => c.id !== incidentCam.id);
      setMainDisplayCam(incidentCam);
      if (otherCams.length > 0) setThumb1Cam(otherCams[0]);
      if (otherCams.length > 1) setThumb2Cam(otherCams[1]);
    },
    [allCameras]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unresolvedRes, resolvedRes] = await Promise.all([
          fetch("/api/incidents?resolved=false"),
          fetch("/api/incidents?resolved=true"),
        ]);
        if (!unresolvedRes.ok || !resolvedRes.ok)
          throw new Error("Failed to fetch incidents");
        const unresolved: IncidentWithCamera[] = await unresolvedRes.json();
        const resolved: IncidentWithCamera[] = await resolvedRes.json();
        const combinedIncidents = [...unresolved, ...resolved].sort(
          (a, b) =>
            new Date(b.tsStart).getTime() - new Date(a.tsStart).getTime()
        );
        setAllIncidents(combinedIncidents);

        // This part is new: we derive cameras directly inside the effect
        const cameras = Array.from(
          new Map(
            combinedIncidents
              .map((inc) => inc.camera)
              .map((cam) => [cam.id, cam])
          ).values()
        );
        setAllCameras(cameras);

        // And set the initial state based on the fetched data
        if (combinedIncidents.length > 0) {
          const initialIncident = combinedIncidents[0];
          const initialCam = initialIncident.camera;
          const otherCams = cameras.filter((c) => c.id !== initialCam.id);

          setActiveIncident(initialIncident);
          setMainDisplayCam(initialCam);
          if (otherCams.length > 0) setThumb1Cam(otherCams[0]);
          if (otherCams.length > 1) setThumb2Cam(otherCams[1]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    // FIXED: The dependency array is now empty [].
    // This tells React to run this effect ONLY ONCE when the component mounts.
    // This stops the infinite loop of GET requests.
  }, []);

  const handleResolveIncident = (incidentId: string) => {
    setAllIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incidentId ? { ...inc, resolved: true } : inc
      )
    );
    if (activeIncident?.id === incidentId) {
      setActiveIncident(null);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-900">
      <Navbar activePage="dashboard" />
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
            <div className="lg:col-span-2 flex flex-col">
              <div className="flex-grow">
                <IncidentPlayer
                  mainCam={mainDisplayCam}
                  thumb1={thumb1Cam}
                  thumb2={thumb2Cam}
                  activeIncident={activeIncident}
                />
              </div>
              <CameraTimeline
                incidents={allIncidents}
                cameras={allCameras}
                onSelectIncident={handleSelectIncident}
                selectedIncidentId={activeIncident?.id}
              />
            </div>

            <div className="lg:col-span-1">
              <IncidentList
                incidents={allIncidents}
                onSelectIncident={handleSelectIncident}
                onResolveIncident={handleResolveIncident}
                selectedIncidentId={activeIncident?.id}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
