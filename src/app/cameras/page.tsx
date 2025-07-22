import Navbar from "@/components/navbar";
import { PrismaClient } from "@prisma/client";
import { Wifi, WifiOff } from "lucide-react";

const prisma = new PrismaClient();

const CamerasPage = async () => {
  const cameras = await prisma.camera.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="min-h-screen flex flex-col bg-slate-900">
      <Navbar activePage="cameras" />
      <div className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Camera Feeds</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cameras.map((camera, index) => (
            <div
              key={camera.id}
              className="bg-slate-800/50 rounded-lg border border-slate-700/50 shadow-lg overflow-hidden"
            >
              <div className="relative w-full aspect-video bg-black">
                <video
                  key={camera.liveFeedUrl}
                  className="w-full h-full object-cover"
                  src={camera.liveFeedUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {camera.name}
                    </h2>
                    <p className="text-sm text-slate-400">{camera.location}</p>
                  </div>
                  <div
                    className={`flex items-center space-x-2 text-sm ${
                      index % 4 === 0 ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {index % 4 === 0 ? (
                      <WifiOff size={16} />
                    ) : (
                      <Wifi size={16} />
                    )}
                    <span>{index % 4 === 0 ? "Offline" : "Online"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CamerasPage;
