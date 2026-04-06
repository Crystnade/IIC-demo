import { Link, Outlet } from "react-router";
import { Cpu, LayoutDashboard, MessageSquarePlus, UserPlus } from "lucide-react";

export function Layout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-indigo-400 font-bold text-xl hover:text-indigo-300 transition-colors">
            <Cpu className="w-6 h-6" />
            <span>TechCon 2026</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-neutral-400">
            <Link to="/register" className="flex items-center gap-2 hover:text-white transition-colors">
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Register</span>
            </Link>
            <Link to="/feedback" className="flex items-center gap-2 hover:text-white transition-colors">
              <MessageSquarePlus className="w-4 h-4" />
              <span className="hidden sm:inline">Feedback</span>
            </Link>
            <Link to="/admin" className="flex items-center gap-2 hover:text-white transition-colors">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col w-full">
        <Outlet />
      </main>
      <footer className="border-t border-neutral-800 py-6 text-center text-sm text-neutral-500">
        <p>&copy; {new Date().getFullYear()} TechCon 2026. All rights reserved.</p>
      </footer>
    </div>
  );
}
