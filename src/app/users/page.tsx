// app/users/page.tsx
import Navbar from "@/components/navbar";
import { Plus } from "lucide-react";
import Image from "next/image";

const users = [
  {
    id: 1,
    name: "Yash Bansal",
    email: "yashbansal26.dev@gmail.com",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "Operator",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
  },
  {
    id: 3,
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Viewer",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
  },
  {
    id: 4,
    name: "Emily White",
    email: "emily.white@example.com",
    role: "Operator",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a",
  },
];

const getRoleStyles = (role: string) => {
  switch (role) {
    case "Admin":
      return "bg-purple-500/20 text-purple-300";
    case "Operator":
      return "bg-blue-500/20 text-blue-300";
    case "Viewer":
      return "bg-slate-500/20 text-slate-300";
    default:
      return "";
  }
};

const UsersPage = () => {
  return (
    <main className="min-h-screen flex flex-col bg-slate-900">
      <Navbar activePage="users" />
      <div className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2">
            <Plus size={20} />
            <span>Add User</span>
          </button>
        </div>

        <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Image
                            className="h-10 w-10 rounded-full"
                            src={user.avatar}
                            alt=""
                            width={48}
                            height={48}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-slate-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleStyles(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-blue-400 hover:text-blue-300">
                        Edit
                      </a>
                      <span className="mx-2 text-slate-600">|</span>
                      <a href="#" className="text-red-400 hover:text-red-300">
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UsersPage;
