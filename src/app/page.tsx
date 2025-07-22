import Navbar from "@/components/navbar";
import IncidentPlayer from "@/components/incident-player";
import IncidentList from "@/components/incident-list";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 h-full">
          <div className="lg:col-span-2">
            <IncidentPlayer />
          </div>
          <div className="lg:col-span-1">
            <IncidentList />
          </div>
        </div>
      </div>
    </main>
  );
}
