"use client";

import {
  ShieldCheck,
  Video,
  AlertTriangle,
  Users,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  activePage?: "dashboard" | "cameras" | "incidents" | "users";
}

const Navbar = ({ activePage = "dashboard" }: NavbarProps) => {
  const [avatarSrc, setAvatarSrc] = useState(
    "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Dashboard", icon: Video, key: "dashboard" },
    { href: "/cameras", label: "Cameras", icon: Video, key: "cameras" },
    {
      href: "/incidents",
      label: "Incidents",
      icon: AlertTriangle,
      key: "incidents",
    },
    { href: "/users", label: "Users", icon: Users, key: "users" },
  ];

  return (
    <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="flex-shrink-0 flex items-center space-x-2"
            >
              <ShieldCheck className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white tracking-wider">
                SecureSight
              </span>
            </Link>
            <div className="hidden lg:flex items-center space-x-2">
              {navLinks.map((link) => {
                const isActive = activePage === link.key;
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    className={`${
                      isActive
                        ? "bg-slate-800 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    } px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2`}
                  >
                    <link.icon size={16} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-1 rounded-full text-slate-300 hover:text-white focus:outline-none">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </button>
            <div className="flex items-center space-x-3">
              <Image
                className="h-8 w-8 rounded-full ring-2 ring-slate-600"
                src={avatarSrc}
                alt="User avatar"
                width={32}
                height={32}
                onError={() => {
                  setAvatarSrc(
                    "https://placehold.co/32x32/64748b/ffffff?text=U"
                  );
                }}
              />
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">Yash Bansal</p>
                <p className="text-xs text-slate-400">
                  yashbansal26.dev@gmail.com
                </p>
              </div>
            </div>
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => {
            const isActive = activePage === link.key;
            return (
              <Link
                key={link.key}
                href={link.href}
                className={`${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                } block px-3 py-2 rounded-md text-base font-medium`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
