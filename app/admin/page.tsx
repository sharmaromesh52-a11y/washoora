"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import AdminStats from "../components/AdminStats";
import Header from "../components/admin/Header";
import SearchBar from "../components/admin/SearchBar";
import BookingTable from "../components/admin/BookingTable";

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
  <div className="min-h-screen bg-zinc-950 p-8">

    <Header
      total={total}
      onLogout={logout}
    />

    <AdminStats
      total={total}
      pending={pending}
      completed={completed}
      cancelled={cancelled}
    />

    <SearchBar
      value={search}
      onChange={setSearch}
    />

    <BookingTable
      bookings={filteredBookings}
      updateStatus={updateStatus}
      deleteBooking={deleteBooking}
    />

  </div>
);
}