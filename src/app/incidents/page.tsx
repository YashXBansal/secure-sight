"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import type { IncidentWithCamera } from "@/types/incident";
import {
  ShieldAlert,
  UserCheck,
  TrafficCone,
  AlertCircle,
  Search,
} from "lucide-react";

const getIncidentTypeDetails = (type: string) => {
  switch (type) {
    case "Unauthorised Access":
      return { Icon: ShieldAlert, color: "text-orange-400" };
    case "Gun Threat":
      return { Icon: AlertCircle, color: "text-red-500" };
    case "Face Recognised":
      return { Icon: UserCheck, color: "text-blue-400" };
    case "Traffic Congestion":
      return { Icon: TrafficCone, color: "text-yellow-400" };
    default:
      return { Icon: ShieldAlert, color: "text-slate-400" };
  }
};

const IncidentsPage = () => {
  const [allIncidents, setAllIncidents] = useState<IncidentWithCamera[]>([]);
  const [filteredIncidents, setFilteredIncidents] = useState<
    IncidentWithCamera[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "resolved" | "unresolved">(
    "all"
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchIncidents = async () => {
      setIsLoading(true);
      const [unresolvedRes, resolvedRes] = await Promise.all([
        fetch("/api/incidents?resolved=false"),
        fetch("/api/incidents?resolved=true"),
      ]);
      const unresolved = await unresolvedRes.json();
      const resolved = await resolvedRes.json();
      const combined = [...unresolved, ...resolved].sort(
        (a, b) => new Date(b.tsStart).getTime() - new Date(a.tsStart).getTime()
      );
      setAllIncidents(combined);
      setFilteredIncidents(combined);
      setIsLoading(false);
    };
    fetchIncidents();
  }, []);

  useEffect(() => {
    let result = allIncidents;
    if (filter !== "all") {
      result = result.filter((inc) => inc.resolved === (filter === "resolved"));
    }
    if (searchTerm) {
      result = result.filter(
        (inc) =>
          inc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inc.camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inc.camera.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredIncidents(result);
  }, [filter, searchTerm, allIncidents]);

  return (
    <main className="min-h-screen flex flex-col bg-slate-900">
      <Navbar activePage="incidents" />
      <div className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-white mb-6">All Incidents</h1>

        {/* Filter and Search Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:max-w-xs">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex bg-slate-800 rounded-md p-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1 text-sm rounded ${
                filter === "all" ? "bg-blue-600 text-white" : "text-slate-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unresolved")}
              className={`px-4 py-1 text-sm rounded ${
                filter === "unresolved"
                  ? "bg-blue-600 text-white"
                  : "text-slate-300"
              }`}
            >
              Unresolved
            </button>
            <button
              onClick={() => setFilter("resolved")}
              className={`px-4 py-1 text-sm rounded ${
                filter === "resolved"
                  ? "bg-blue-600 text-white"
                  : "text-slate-300"
              }`}
            >
              Resolved
            </button>
          </div>
        </div>

        {/* Incidents Table */}
        <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Camera
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-slate-400">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  filteredIncidents.map((incident) => {
                    const { Icon, color } = getIncidentTypeDetails(
                      incident.type
                    );
                    return (
                      <tr key={incident.id} className="hover:bg-slate-800">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`flex items-center ${color}`}>
                            <Icon size={16} className="mr-2" />
                            {incident.type}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                          {incident.camera.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                          {new Date(incident.tsStart).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {incident.resolved ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500/20 text-green-300">
                              Resolved
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500/20 text-red-300">
                              Unresolved
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IncidentsPage;
