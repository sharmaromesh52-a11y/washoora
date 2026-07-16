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
};

export default function AdminPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const channelRef = useRef<any>(null);
  const firstLoad = useRef(true);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin !== "true") {
      router.push("/login");
      return;
    }
    loadBookings();
  }, [router]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

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
    localStorage.removeItem("admin");
    router.push("/login");
  }

  const total = bookings.length;
  const pending = bookings.filter((b) => b.status === "Pending").length;
  const completed = bookings.filter((b) => b.status === "Completed").length;
  const cancelled = bookings.filter((b) => b.status === "Cancelled").length;
  
  const today = new Date().toISOString().split("T")[0];
  const todayBookings = bookings.filter((b) => b.booking_date === today).length;

  const filteredBookings = useMemo(() => {
    const q = search.toLowerCase();
    return bookings.filter((b) => {
      return (
        (b.customer_name?.toLowerCase() || "").includes(q) ||
        (b.phone?.toLowerCase() || "").includes(q) ||
        (b.vehicle_type?.toLowerCase() || "").includes(q) ||
        (b.service?.toLowerCase() || "").includes(q)
      );
    });
  }, [bookings, search]);

  const customerHistory = useMemo(() => {
    if (!selectedBooking) return [];
    return bookings.filter(
      (b) => b.phone === selectedBooking.phone && b.id !== selectedBooking.id
    );
  }, [bookings, selectedBooking]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 font-sans">
      {showToast && (
        <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-xl animate-bounce">
          🚗 New Booking Received!
        </div>
      )}

      {/* Header section */}
      <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-4xl font-bold text-blue-500 tracking-wide">WASH<span className="text-white">OORA</span></h1>
          <p className="text-zinc-400 text-sm mt-1">Admin Management Dashboard</p>
        </div>
        <button onClick={logout} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition">
          Logout
        </button>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl text-center">
          <p className="text-zinc-400 text-xs uppercase font-medium">Total Bookings</p>
          <p className="text-3xl font-bold mt-2 text-white">{total}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl text-center">
          <p className="text-zinc-400 text-xs uppercase font-medium text-yellow-500">Pending</p>
          <p className="text-3xl font-bold mt-2 text-yellow-500">{pending}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl text-center">
          <p className="text-zinc-400 text-xs uppercase font-medium text-green-500">Completed</p>
          <p className="text-3xl font-bold mt-2 text-green-500">{completed}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl text-center">
          <p className="text-zinc-400 text-xs uppercase font-medium text-red-500">Cancelled</p>
          <p className="text-3xl font-bold mt-2 text-red-500">{cancelled}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl text-center col-span-2 lg:col-span-1">
          <p className="text-zinc-400 text-xs uppercase font-medium text-blue-400">Today's Jobs</p>
          <p className="text-3xl font-bold mt-2 text-blue-400">{todayBookings}</p>
        </div>
      </div>

      {/* Search Filter Box */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search name, phone number, vehicle or service type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-zinc-800 rounded-xl p-3.5 bg-zinc-950 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 text-sm"
        />
      </div>

      {/* Main Bookings Data Table */}
      <div className="overflow-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl">
        <table className="w-full text-center border-collapse text-sm">
          <thead className="bg-zinc-950 text-zinc-400 uppercase font-semibold border-b border-zinc-800">
            <tr>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Vehicle Model</th>
              <th className="p-4">Service Type</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 text-zinc-300">
            {filteredBookings.map((b) => (
              <tr key={b.id} className="hover:bg-zinc-800/40 transition cursor-pointer" onClick={() => setSelectedBooking(b)}>
                <td className="p-4 font-medium text-white text-left pl-6">{b.customer_name}</td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <a href={`tel:${b.phone}`} className="text-blue-400 hover:underline">
                    {b.phone}
                  </a>
                </td>
                <td className="p-4 text-cyan-400">{b.vehicle_type}</td>
                <td className="p-4">{b.service}</td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b.id, e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white focus:outline-none text-xs"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-4 space-x-2" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={`https://wa.me/91${b.phone}?text=${encodeURIComponent(
                      `Hi ${b.customer_name},\n\nYour Washoora doorstep booking status has been updated to: "${b.status}".\n\nThank you for choosing Washoora Car Care!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs inline-block transition font-medium"
                  >
                    WhatsApp
                  </a>
                  <button
                    onClick={() => deleteBooking(b.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs transition font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-zinc-500 text-center">No bookings found matching your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Details View Modal (Popup) */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-1">Booking Breakdown</h2>
            <p className="text-xs text-zinc-500 mb-4">Detailed summary of customer order</p>
            
            <div className="space-y-3 bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-sm">
              <p><span className="text-zinc-500 font-medium">Customer Name:</span> <span className="text-white float-right font-semibold">{selectedBooking.customer_name}</span></p>
              <p><span className="text-zinc-500 font-medium">Phone:</span> <span className="text-blue-400 float-right">{selectedBooking.phone}</span></p>
              <p><span className="text-zinc-500 font-medium">Vehicle:</span> <span className="text-cyan-400 float-right font-semibold">{selectedBooking.vehicle_type}</span></p>
              <p><span className="text-zinc-500 font-medium">Service Selected:</span> <span className="text-white float-right">{selectedBooking.service}</span></p>
              <p><span className="text-zinc-500 font-medium">Address:</span> <span className="text-zinc-300 block mt-1 bg-zinc-900 p-2 rounded-lg border border-zinc-800">{selectedBooking.address}</span></p>
              <p><span className="text-zinc-500 font-medium">Date & Time:</span> <span className="text-white float-right font-mono">{selectedBooking.booking_date} | {selectedBooking.booking_time || "N/A"}</span></p>
              <p>
                <span className="text-zinc-500 font-medium">Current Status:</span> 
                <span className={`float-right font-bold text-xs px-2 py-1 rounded-md ${
                  selectedBooking.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                  selectedBooking.status === 'Confirmed' ? 'bg-blue-500/20 text-blue-400' :
                  selectedBooking.status === 'Cancelled' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>{selectedBooking.status}</span>
              </p>
            </div>

            {/* Previous Customer Booking History Section */}
            {customerHistory.length > 0 && (
              <div className="mt-5">
                <h3 className="text-sm font-bold text-zinc-400 mb-2">Customer Previous Logs</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                  {customerHistory.map((h) => (
                    <div key={h.id} className="flex justify-between items-center border border-zinc-800 bg-zinc-950 rounded-xl p-2.5 text-xs">
                      <div>
                        <p className="text-white font-medium">{h.service}</p>
                        <p className="text-zinc-500 text-[10px]">{h.booking_date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-cyan-400 font-mono">{h.vehicle_type}</p>
                        <p className={`text-[10px] ${h.status === 'Completed' ? 'text-green-400' : 'text-yellow-500'}`}>{h.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button onClick={() => setSelectedBooking(null)} className="flex-1 py-2.5 rounded-xl border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white font-medium text-sm transition">
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}