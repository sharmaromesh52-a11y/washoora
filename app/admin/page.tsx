"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

type Booking = {
  id: number;
  customer_name: string;
  phone: string;
  vehicle_type: string;
  service: string;
  address: string;
  booking_date: string;
  booking_time: string;
  status: string;
  worker_assigned?: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [securityPin, setSecurityPin] = useState("");
  const [pinError, setPinError] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showToast, setShowToast] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const channelRef = useRef<any>(null);
  const firstLoad = useRef(true);

  const availableWorkers = ["Unassigned", "Rajesh Kumar", "Sunil Sharma", "Amit Meena", "Vikram Singh"];

  useEffect(() => {
    const admin = localStorage.getItem("admin_secure_session");
    if (admin === "true") {
      setIsAuthenticated(true);
      loadBookings();
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    channelRef.current = supabase
      .channel("bookings-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookings",
        },
        () => {
          if (!firstLoad.current) {
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 4000);
          }
          loadBookings();
        }
      )
      .subscribe();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [isAuthenticated]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (securityPin === "9922" || securityPin === "2026") {
      localStorage.setItem("admin_secure_session", "true");
      setIsAuthenticated(true);
      setPinError(false);
      loadBookings();
    } else {
      setPinError(true);
      setSecurityPin("");
    }
  };

  async function loadBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error loading bookings:", error.message);
    } else if (data) {
      setBookings(data as Booking[]);
    }
  }

  async function updateStatus(id: number, status: string) {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert("Status update failed: " + error.message);
    } else {
      loadBookings();
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking((prev) => prev ? { ...prev, status } : null);
      }
    }
  }

  async function updateWorker(id: number, workerName: string) {
    await supabase
      .from("bookings")
      .update({ worker_assigned: workerName })
      .eq("id", id);

    loadBookings();
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking((prev) => prev ? { ...prev, worker_assigned: workerName } : null);
    }
  }

  async function deleteBooking(id: number) {
    if (!confirm("Delete Booking?")) return;

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Delete failed: " + error.message);
    } else {
      loadBookings();
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking(null);
      }
    }
  }

  function logout() {
    localStorage.removeItem("admin_secure_session");
    setIsAuthenticated(false);
    router.push("/admin");
  }

  const getServicePrice = (serviceName: string): number => {
    const name = serviceName.toLowerCase();
    if (name.includes("interior")) return 399;
    if (name.includes("exterior")) return 199;
    if (name.includes("premium") || name.includes("detail")) return 399;
    if (name.includes("bike") || name.includes("scooty")) return 79;
    return 199;
  };

  const handleSendInvoice = (b: Booking) => {
    const price = getServicePrice(b.service);
    const invoiceText = `━━━━━━━━━━━━━━━━━━━━\n   🧾 *WASHUORA CAR CARE*   \n   Premium Doorstep Service\n━━━━━━━━━━━━━━━━━━━━\n\n*Invoice ID:* WSH-INV-${b.id}\n*Customer:* ${b.customer_name}\n*Vehicle:* ${b.vehicle_type}\n*Service Profile:* ${b.service}\n\n*Service Base:* ₹${price}\n*Home Visit Fee:* ₹0 (FREE)\n*Total Amount:* ₹${price}\n\n*Status:* ✅ PAID / COMPLETED\n\n━━━━━━━━━━━━━━━━━━━━\nThank you for choosing Washoora!\n302, Kamal Heights, Modi Road, Jhunjhunu`;

    window.open(
      `https://wa.me/91${b.phone}?text=${encodeURIComponent(invoiceText)}`,
      "_blank"
    );
  };

  const exportToCSV = () => {
    if (filteredBookings.length === 0) {
      alert("No data available to export node payload.");
      return;
    }

    const headers = ["Order ID", "Customer Name", "Phone", "Vehicle Identity", "Service Profile", "Date", "Time Slot", "Status", "Assigned Operator"];
    
    const rows = filteredBookings.map(b => [
      `WSH-${b.id}`,
      `"${b.customer_name.replace(/"/g, '""')}"`,
      b.phone,
      `"${b.vehicle_type.replace(/"/g, '""')}"`,
      `"${b.service.replace(/"/g, '""')}"`,
      b.booking_date,
      b.booking_time || "N/A",
      b.status,
      b.worker_assigned || "Unassigned"
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `washoora_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const total = bookings.length;
  const pending = bookings.filter((b) => b.status === "Pending" || b.status === "pending").length;
  const completedBookings = bookings.filter((b) => b.status === "Completed" || b.status === "completed" || b.status === "Confirmed" || b.status === "confirmed");
  const completed = bookings.filter((b) => b.status === "Completed" || b.status === "completed").length;
  const cancelled = bookings.filter((b) => b.status === "Cancelled" || b.status === "cancelled").length;
  
  const totalRevenue = useMemo(() => {
    return completedBookings.reduce((sum, b) => sum + getServicePrice(b.service), 0);
  }, [completedBookings]);

  const filteredBookings = useMemo(() => {
    const q = search.toLowerCase();
    return bookings.filter((b) => {
      const matchesSearch = 
        (b.customer_name?.toLowerCase() || "").includes(q) ||
        (b.phone?.toLowerCase() || "").includes(q) ||
        (b.vehicle_type?.toLowerCase() || "").includes(q) ||
        (b.service?.toLowerCase() || "").includes(q) ||
        (b.worker_assigned?.toLowerCase() || "").includes(q);
      
      const matchesStatus = statusFilter === "All" || b.status.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  // 🛡️ SECURITY LAYER SCREEN RENDER LOGIC
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#000000] text-white flex items-center justify-center font-sans p-4 selection:bg-[#1488fc]/20">
        <div className="bg-[#171719] border border-zinc-800 p-8 rounded-2xl w-full max-w-sm text-center shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-[#1488fc]/10 border border-[#1488fc]/30 flex items-center justify-center mx-auto text-xl text-[#1488fc] font-mono font-bold shadow-[0_0_15px_rgba(20,136,252,0.1)] mb-4">
            W
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-zinc-100">Gateway Authentication</h2>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Washoora Admin Node Platform</p>
          
          <form onSubmit={handlePinSubmit} className="mt-6 space-y-4">
            <input
              type="password"
              maxLength={4}
              value={securityPin}
              onChange={(e) => setSecurityPin(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 4-Digit Security PIN"
              className={`w-full text-center border p-3 rounded-xl bg-[#000000] text-white tracking-[1em] text-lg font-bold font-mono focus:outline-none focus:border-[#1488fc] transition-colors ${
                pinError ? "border-red-600/60 focus:border-red-500" : "border-zinc-800"
              }`}
            />
            {pinError && (
              <p className="text-red-400 font-mono text-[10px] uppercase font-bold tracking-wider">Invalid node token credentials.</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-[#1488fc] hover:bg-[#1488fc]/90 text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(20,136,252,0.2)]"
            >
              Verify Node Gateway
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-[#fffefe] p-8 font-sans selection:bg-[#1488fc]/30 select-none">
      {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#1488fc] text-white px-6 py-4 rounded-xl shadow-[0_0_30px_rgba(20,136,252,0.3)] border border-[#2ba6ff]/40 font-medium">
          🚗 New Booking Received!
        </div>
      )}

      {/* Premium Header Console */}
      <div className="flex justify-between items-center mb-10 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            WASH<span className="text-[#1488fc]">OORA</span> DTO
          </h1>
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-semibold mt-1">Luxury Vehicle Care Workspace</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={exportToCSV}
            className="bg-zinc-900 hover:bg-zinc-800 text-[#1488fc] px-4 py-2 rounded-lg text-xs font-bold border border-zinc-800 hover:border-[#1488fc]/40 transition-all duration-150"
          >
            Export Logs
          </button>
          <button onClick={logout} className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white px-5 py-2 rounded-lg text-xs font-semibold border border-zinc-800 transition-all duration-200 focus:outline-none">
            Logout
          </button>
        </div>
      </div>

      {/* Token-Driven Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
        <div className="bg-[#171719] border border-zinc-800/80 p-6 rounded-xl relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-wider">Total Orders</p>
          <p className="text-3xl font-bold mt-2 font-mono tracking-tight text-white">{total}</p>
          <div className="absolute right-0 bottom-0 top-0 w-1 bg-zinc-700" />
        </div>
        <div className="bg-[#171719] border border-zinc-800/80 p-6 rounded-xl relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <p className="text-amber-500/80 text-[11px] font-bold uppercase tracking-wider">Queue Pending</p>
          <p className="text-3xl font-bold mt-2 font-mono tracking-tight text-amber-400">{pending}</p>
          <div className="absolute right-0 bottom-0 top-0 w-1 bg-amber-500/50" />
        </div>
        <div className="bg-[#171719] border border-[#1488fc]/20 p-6 rounded-xl relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <p className="text-[#2ba6ff] text-[11px] font-bold uppercase tracking-wider">Jobs Completed</p>
          <p className="text-3xl font-bold mt-2 font-mono tracking-tight text-[#1488fc]">{completed}</p>
          <div className="absolute right-0 bottom-0 top-0 w-1 bg-[#1488fc]" />
        </div>
        <div className="bg-[#171719] border border-zinc-800/80 p-6 rounded-xl relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <p className="text-red-500/80 text-[11px] font-bold uppercase tracking-wider">Cancelled</p>
          <p className="text-3xl font-bold mt-2 font-mono tracking-tight text-red-500">{cancelled}</p>
          <div className="absolute right-0 bottom-0 top-0 w-1 bg-red-600/40" />
        </div>
        <div className="bg-[#171719] border border-emerald-500/20 p-6 rounded-xl relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] col-span-1 sm:col-span-2 lg:col-span-1">
          <p className="text-emerald-400 text-[11px] font-bold uppercase tracking-wider">Tracked Revenue</p>
          <p className="text-3xl font-extrabold mt-2 font-mono text-emerald-400">₹{totalRevenue}</p>
          <div className="absolute right-0 bottom-0 top-0 w-1 bg-emerald-500" />
        </div>
      </div>

      {/* Filter Control Console */}
      <div className="bg-[#171719] border border-zinc-800/60 rounded-xl p-3 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Filter logs by client name, assigned worker, or area platform..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:flex-1 border border-zinc-800 rounded-lg p-2.5 bg-[#000000] text-white placeholder-zinc-600 focus:outline-none focus:border-[#1488fc] focus:ring-1 focus:ring-[#1488fc] text-xs font-mono"
        />
        <div className="flex gap-1.5 w-full md:w-auto overflow-x-auto">
          {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all duration-150 shrink-0 ${
                statusFilter === tab 
                  ? "bg-[#1488fc] text-white shadow-[0_0_15px_rgba(20,136,252,0.2)]" 
                  : "bg-[#000000] text-zinc-500 border border-zinc-800 hover:text-zinc-300 hover:bg-zinc-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Structured Table */}
      <div className="overflow-auto bg-[#171719] border border-zinc-800/60 rounded-xl shadow-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-[#000000] text-zinc-500 uppercase font-bold border-b border-zinc-800 text-[10px] tracking-wider">
            <tr>
              <th className="p-4 pl-6">Client Architecture</th>
              <th className="p-4">Phone Link</th>
              <th className="p-4">Vehicle Identity</th>
              <th className="p-4">Service Profile</th>
              <th className="p-4">Deployment Status</th>
              <th className="p-4">Assigned Operations</th>
              <th className="p-4 text-center">Operation Cluster</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50 font-mono text-zinc-300">
            {filteredBookings.map((b) => (
              <tr 
                key={b.id} 
                className="hover:bg-[#1e1e21]/60 transition-all duration-150 cursor-pointer" 
                onClick={() => setSelectedBooking(b)}
              >
                <td className="p-4 font-semibold text-white pl-6 font-sans text-sm">{b.customer_name}</td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <a href={`tel:${b.phone}`} className="text-[#1488fc] hover:underline hover:text-[#2ba6ff]">
                    {b.phone}
                  </a>
                </td>
                <td className="p-4 text-zinc-400 font-sans font-medium">{b.vehicle_type}</td>
                <td className="p-4 text-zinc-200 font-sans">{b.service}</td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b.id, e.target.value)}
                    className="bg-[#000000] border border-zinc-800 rounded-md p-1.5 text-zinc-300 focus:outline-none focus:border-[#1488fc] text-[11px]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={b.worker_assigned || "Unassigned"}
                    onChange={(e) => updateWorker(b.id, e.target.value)}
                    className="bg-[#000000] border border-zinc-800 rounded-md p-1.5 text-cyan-400 font-sans font-medium focus:outline-none focus:border-cyan-500 text-[11px]"
                  >
                    {availableWorkers.map((wk, idx) => (
                      <option key={idx} value={wk} className="text-white">{wk}</option>
                    ))}
                  </select>
                </td>
                <td className="p-4 space-x-1.5 text-center" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleSendInvoice(b)}
                    className="bg-zinc-900 border border-zinc-800 hover:border-blue-500 text-blue-400 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-150"
                  >
                    Send Invoice
                  </button>
                  <button
                    onClick={() => deleteBooking(b.id)}
                    className="bg-zinc-900 border border-zinc-800 hover:border-red-500 text-red-400 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-150"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan={7} className="p-10 text-zinc-600 text-center text-xs font-mono">Empty state: No active matrix nodes match filter query.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PopUp Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4 backdrop-blur-md transition-opacity duration-200">
          <div className="bg-[#171719] border border-zinc-800 w-full max-w-lg rounded-xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-extrabold text-white tracking-tight">Anatomy Breakdown</h2>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-5">Cluster Node Data Payload</p>
            
            <div className="space-y-3 bg-[#000000] p-4 rounded-lg border border-zinc-800/80 text-xs font-mono">
              <p className="flex justify-between border-b border-zinc-900 pb-1"><span className="text-zinc-500">CLIENT_NAME:</span> <span className="text-white font-sans font-bold">{selectedBooking.customer_name}</span></p>
              <p className="flex justify-between border-b border-zinc-900 pb-1"><span className="text-zinc-500">INTERFACE_TEL:</span> <span className="text-[#1488fc]">{selectedBooking.phone}</span></p>
              <p className="flex justify-between border-b border-zinc-900 pb-1"><span className="text-zinc-500">VEHICLE_CLASS:</span> <span className="text-white font-sans font-semibold">{selectedBooking.vehicle_type}</span></p>
              <p className="flex justify-between border-b border-zinc-900 pb-1"><span className="text-zinc-500">SERVICE_PROFILE:</span> <span className="text-zinc-300 font-sans">{selectedBooking.service}</span></p>
              <p className="flex justify-between border-b border-zinc-900 pb-1"><span className="text-zinc-500">ESTIMATED_VALUE:</span> <span className="text-emerald-400 font-bold font-mono text-sm">₹{getServicePrice(selectedBooking.service)}</span></p>
              <p className="flex justify-between border-b border-zinc-900 pb-1"><span className="text-zinc-500">ASSIGNED_OPERATOR:</span> <span className="text-cyan-400 font-sans">{selectedBooking.worker_assigned || "Unassigned"}</span></p>
              <p className="flex justify-between border-b border-zinc-900 pb-1"><span className="text-zinc-500">DATAFRAME_STAMP:</span> <span className="text-zinc-400 font-mono">{selectedBooking.booking_date} | {selectedBooking.booking_time || "N/A"}</span></p>
              <div className="pt-1">
                <span className="text-zinc-500 block mb-1">TARGET_ADDRESS_NODE:</span> 
                <span className="text-zinc-300 block bg-[#171719] p-2 rounded border border-zinc-800 font-sans text-xs leading-relaxed">{selectedBooking.address}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => handleSendInvoice(selectedBooking)}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-all duration-150 shadow-[0_0_15px_rgba(20,136,252,0.2)]"
              >
                Generate & Send Bill Text
              </button>
              <button onClick={() => setSelectedBooking(null)} className="flex-1 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white font-semibold text-xs rounded-lg transition-all duration-150">
                Terminate View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}