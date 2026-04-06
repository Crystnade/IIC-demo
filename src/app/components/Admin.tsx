import { useEffect, useState } from "react";
import { getRegistrations, getFeedback } from "../api";
import { Users, MessageSquare, AlertCircle, Loader2, RefreshCw, Download, Lock, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [activeTab, setActiveTab] = useState<"registrations" | "feedback">("registrations");
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "pr1y@n$hu") {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setPasswordError("Incorrect password");
    }
  };

  const exportToCSV = () => {
    const data = activeTab === "registrations" ? registrations : feedback;
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }

    // Extract headers (excluding internal ids)
    const allKeys = Array.from(new Set(data.flatMap(item => Object.keys(item))));
    const headers = allKeys.filter(k => k !== 'id');
    
    const csvContent = [
      headers.join(","),
      ...data.map(row => 
        headers.map(header => {
          const val = row[header];
          if (val === null || val === undefined) return '""';
          return `"${val.toString().replace(/"/g, '""')}"`;
        }).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `techcon_${activeTab}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [regRes, feedRes] = await Promise.all([
        getRegistrations(),
        getFeedback()
      ]);
      setRegistrations(regRes.registrations || []);
      setFeedback(feedRes.feedback || []);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load data";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex-1 w-full flex items-center justify-center p-4 bg-neutral-950">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl"
        >
          <div className="mb-8 text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Admin Access</h2>
            <p className="text-neutral-400 text-sm">Please enter the admin password to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <KeyRound className="w-5 h-5 text-neutral-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                className="w-full h-11 pl-10 pr-4 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Enter password"
                autoFocus
              />
              {passwordError && <p className="text-red-400 text-sm">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="w-full h-11 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              Unlock Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full p-6 md:p-12 bg-neutral-950">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Admin Dashboard</h1>
            <p className="text-neutral-400">Manage event registrations and review participant feedback.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Export to CSV
            </button>
            <button 
              onClick={fetchData}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-400">Total Registrations</p>
              <p className="text-3xl font-bold text-white">{registrations.length}</p>
            </div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-400">Feedback Entries</p>
              <p className="text-3xl font-bold text-white">{feedback.length}</p>
            </div>
          </div>
        </div>

        {error ? (
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-300">Error loading data</h3>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        ) : (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col">
            <div className="flex items-center border-b border-neutral-800 bg-neutral-900/50">
              <button
                onClick={() => setActiveTab("registrations")}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === "registrations" ? "border-indigo-500 text-indigo-400 bg-indigo-500/5" : "border-transparent text-neutral-400 hover:text-neutral-300 hover:bg-neutral-800/50"}`}
              >
                Registrations
              </button>
              <button
                onClick={() => setActiveTab("feedback")}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === "feedback" ? "border-emerald-500 text-emerald-400 bg-emerald-500/5" : "border-transparent text-neutral-400 hover:text-neutral-300 hover:bg-neutral-800/50"}`}
              >
                Feedback
              </button>
            </div>

            <div className="p-0 overflow-x-auto min-h-[300px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-64 text-neutral-500 gap-3">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Loading data...</span>
                </div>
              ) : activeTab === "registrations" ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-800 bg-neutral-950/50 text-neutral-400 text-sm">
                      <th className="px-6 py-4 font-medium">Name</th>
                      <th className="px-6 py-4 font-medium">Email</th>
                      <th className="px-6 py-4 font-medium">Phone</th>
                      <th className="px-6 py-4 font-medium">Branch</th>
                      <th className="px-6 py-4 font-medium">Track Preference</th>
                      <th className="px-6 py-4 font-medium text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {registrations.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-neutral-500">
                          No registrations found.
                        </td>
                      </tr>
                    ) : (
                      registrations.map((reg, i) => (
                        <motion.tr 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          key={reg.id || i} 
                          className="hover:bg-neutral-800/50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-neutral-200">{reg.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-neutral-400">{reg.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-neutral-400">{reg.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-neutral-300">
                            <span className="inline-flex px-2 py-1 rounded-md bg-neutral-800 text-xs">
                              {reg.branch}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs">
                              {reg.event}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-neutral-500 text-sm">
                            {new Date(reg.createdAt).toLocaleDateString()}
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-800 bg-neutral-950/50 text-neutral-400 text-sm">
                      <th className="px-6 py-4 font-medium w-1/4">Participant</th>
                      <th className="px-6 py-4 font-medium w-1/6">Rating</th>
                      <th className="px-6 py-4 font-medium w-1/2">Comments</th>
                      <th className="px-6 py-4 font-medium text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {feedback.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-neutral-500">
                          No feedback found.
                        </td>
                      </tr>
                    ) : (
                      feedback.map((item, i) => (
                        <motion.tr 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          key={item.id || i} 
                          className="hover:bg-neutral-800/50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-neutral-200">{item.name || "Anonymous"}</p>
                            {item.email && <p className="text-neutral-500 text-xs">{item.email}</p>}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                              {item.rating} / 5
                            </span>
                          </td>
                          <td className="px-6 py-4 text-neutral-300 text-sm">
                            {item.comments}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-neutral-500 text-sm">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
