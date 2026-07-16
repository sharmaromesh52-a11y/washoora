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
  const pending = bookings.filter((b) => b.status === "Pending" || b.status === "pending").length;
  const completed = bookings.filter((b) => b.status === "Completed" || b.status === "completed").length;
  const cancelled = bookings.filter((b) => b.status === "Cancelled" || b.status === "cancelled").length;
  
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
    <div className="min-h-screen bg-[#0d0f12] text-white p-8 font-sans">
      {showToast && (
        <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-xl">
          🚗 New Booking Received!
        </div>
      )}

      {/* Header section */}
      <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-wide">Washoora Admin</h1>
          <p className="text-zinc-400 text-sm mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-zinc-900 px-4 py-2 rounded-xl text-xs border border-zinc-800">
            <span className="text-zinc-400">Total Bookings: </span>
            <span className="font-bold text-white text-sm">{total}</span>
          </div>
          <button onClick={logout} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition">
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-3xl relative overflow-hidden shadow-lg">
          <p className="text-blue-100 text-sm font-medium">Total Bookings</p>
          <p className="text-4xl font-bold mt-2 text-white">{total}</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-3xl relative overflow-hidden shadow-lg">
          <p className="text-amber-100 text-sm font-medium">Pending</p>
          <p className="text-4xl font-bold mt-2 text-white">{pending}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-3xl relative overflow-hidden shadow-lg">
          <p className="text-emerald-100 text-sm font-medium">Completed</p>
          <p className="text-4xl font-bold mt-2 text-white">{completed}</p>
        </div>
        <div className="bg-gradient-to-br from-pink-600 to-pink-700 p-6 rounded-3xl relative overflow-hidden shadow-lg">
          <p className="text-pink-100 text-sm font-medium">Cancelled</p>
          <p className="text-4xl font-bold mt-2 text-white">{cancelled}</p>
        </div>
      </div>

      {/* Search Filter Box */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-6">
        <input
          type="text"
          placeholder="Search by customer, phone, vehicle..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-zinc-800 rounded-xl p-3.5 bg-zinc-950 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 text-sm"
        />
      </div>

      {/* Main Bookings Data Table */}
      <div className="overflow-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-[#16191f] text-zinc-400 uppercase font-semibold border-b border-zinc-800 text-xs">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Vehicle</th>
              <th className="p-4">Service</th>
              <th className="p-4">Address</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 text-zinc-300">
            {filteredBookings.map((b) => (
              <tr 
                key={b.id} 
                className="hover:bg-zinc-800/40 transition cursor-pointer" 
                onClick={() => setSelectedBooking(b)}
              >
                <td className="p-4 font-semibold text-white">{b.customer_name}</td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <a href={`tel:${b.phone}`} className="text-blue-400 hover:underline">
                    {b.phone}
                  </a>
                </td>
                <td className="p-4 text-zinc-400">{b.vehicle_type}</td>
                <td className="p-4 font-medium">{b.service}</td>
                <td className="p-4 text-zinc-400 max-w-xs truncate">{b.address}</td>
                <td className="p-4 font-mono text-zinc-400">{b.booking_date}</td>
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
                <td className="p-4 space-x-2 text-center" onClick={(e) => e.stopPropagation()}>
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
                <td colSpan={8} className="p-8 text-zinc-500 text-center">No bookings found matching your search.</td>
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
              <button onClick={() => setSelectedBooking(null)} className="flex-1 py-2.5 rounded-xl border border-zinc-800 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white font-medium text-sm transition">
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}