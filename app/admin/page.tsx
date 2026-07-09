"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import AdminStats from "../components/AdminStats";

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
  const channelRef = useRef<any>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
  const admin = localStorage.getItem("admin");

  if (admin !== "true") {
    router.push("/login");
    return;
  }

  loadBookings();
}, []);
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

  async function loadBookings() {
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setBookings(data);
    }
  }

  async function updateStatus(id: number, status: string) {
    await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    loadBookings();
  }

  async function deleteBooking(id: number) {
    if (!confirm("Delete Booking?")) return;

    await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    loadBookings();
  }

  function logout() {
    localStorage.removeItem("admin");
    router.push("/login");
  }

  const total = bookings.length;

  const pending = bookings.filter(
    (b) => b.status === "Pending"
  ).length;

  const completed = bookings.filter(
    (b) => b.status === "Completed"
  ).length;

  const cancelled = bookings.filter(
    (b) => b.status === "Cancelled"
  ).length;

  const filteredBookings = useMemo(() => {
    const q = search.toLowerCase();

    return bookings.filter((b) => {
      return (
        b.customer_name.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        b.vehicle_type.toLowerCase().includes(q) ||
        b.service.toLowerCase().includes(q)
      );
    });
  }, [bookings, search]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Washoora Admin Panel
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      <AdminStats
        total={total}
        pending={pending}
        completed={completed}
        cancelled={cancelled}
      />

      <div className="bg-white rounded-xl shadow p-5 mb-6">

        <input
          type="text"
          placeholder="🔍 Search Booking..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

      </div>
            <div className="overflow-auto bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-black text-white">

            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Vehicle</th>
              <th className="p-3">Service</th>
              <th className="p-3">Address</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredBookings.map((b) => (

              <tr key={b.id} className="border-b text-center">

                <td className="p-3">{b.customer_name}</td>

                <td>
  <a
    href={`tel:${b.phone}`}
    className="text-blue-600 hover:underline font-medium"
  >
    {b.phone}
  </a>
</td>

                <td>{b.vehicle_type}</td>

                <td>{b.service}</td>

                <td>{b.address}</td>

                <td>{b.booking_date}</td>

                <td>

                  <select
                    value={b.status}
                    onChange={(e) =>
                      updateStatus(b.id, e.target.value)
                    }
                    className="border rounded p-2"
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>

                </td>

               <td className="space-x-2">

  <a
    href={`https://wa.me/91${b.phone}?text=${encodeURIComponent(
      `Hi ${b.customer_name},

Your Washoora booking is currently "${b.status}".

Thank you for choosing Washoora.`
    )}`}
    target="_blank"
    className="bg-green-600 text-white px-3 py-2 rounded"
  >
    WhatsApp
  </a>

  <button
    onClick={() => deleteBooking(b.id)}
    className="bg-red-600 text-white px-3 py-2 rounded"
  >
    Delete
  </button>

</td>

              </tr>

            ))}

          </tbody>

        </table>

        </div>

    </div>
  );
}