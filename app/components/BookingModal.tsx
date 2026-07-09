"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function BookingModal() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    car: "",
    service: "",
    address: "",
    date: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async () => {
    if (
      !form.name ||
      !form.phone ||
      !form.car ||
      !form.service ||
      !form.address ||
      !form.date
    ) {
      alert("Please fill all fields");
      return;
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          customer_name: form.name,
          phone: form.phone,
          vehicle_type: form.car,
          service: form.service,
          address: form.address,
          booking_date: form.date,
          booking_time: new Date().toLocaleTimeString(),
          status: "Pending",
        },
      ])
      .select();

    console.log("DATA =>", data);
    console.log("ERROR =>", error);

    if (error) {
      alert(JSON.stringify(error));
      return;
    }

    const msg = `🚗 *New Washoora Booking*

Name: ${form.name}
Phone: ${form.phone}
Car: ${form.car}
Service: ${form.service}
Address: ${form.address}
Date: ${form.date}`;

    window.open(
      `https://wa.me/919511539740?text=${encodeURIComponent(msg)}`,
      "_blank"
    );

    alert("Booking Saved Successfully");

    setForm({
      name: "",
      phone: "",
      car: "",
      service: "",
      address: "",
      date: "",
    });

    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition"
      >
        Book Now
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[99999]"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111827] rounded-3xl p-8 w-full max-w-lg"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Book Car Wash
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 rounded-xl bg-gray-800 text-white"
              />

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-3 rounded-xl bg-gray-800 text-white"
              />

              <input
                type="text"
                name="car"
                value={form.car}
                onChange={handleChange}
                placeholder="Car Model"
                className="w-full p-3 rounded-xl bg-gray-800 text-white"
              />

              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-800 text-white"
              >
                <option value="">Select Service</option>
                <option value="Foam Wash">Foam Wash</option>
                <option value="Interior Cleaning">Interior Cleaning</option>
                <option value="Premium Detail Wash">Premium Detail Wash</option>
                <option value="Ceramic Coating">Ceramic Coating</option>
              </select>

              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-3 rounded-xl bg-gray-800 text-white"
              />

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-800 text-white"
              />
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-3 border border-gray-600 rounded-xl text-white"
              >
                Cancel
              </button>

              <button
                onClick={submit}
                className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white"
              >
                Book
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}