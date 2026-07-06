"use client";

import { useState } from "react";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = () => {
    if (
      !form.name ||
      !form.phone ||
      !form.car ||
      !form.service ||
      !form.address ||
      !form.date
    ) {
      alert("Please fill all fields.");
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

    setOpen(false);

    setForm({
      name: "",
      phone: "",
      car: "",
      service: "",
      address: "",
      date: "",
    });
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
  className="fixed left-0 top-0 w-screen h-screen z-[99999] bg-black/70 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 flex items-center justify-center p-4">

            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#111827] rounded-3xl p-8"
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
                  className="w-full p-3 rounded-xl bg-[#1F2937] text-white outline-none"
                />

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="w-full p-3 rounded-xl bg-[#1F2937] text-white outline-none"
                />

                <input
                  type="text"
                  name="car"
                  value={form.car}
                  onChange={handleChange}
                  placeholder="Car Model"
                  className="w-full p-3 rounded-xl bg-[#1F2937] text-white outline-none"
                />

                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#1F2937] text-white outline-none"
                >
                  <option value="">Select Service</option>
                  <option>Foam Wash</option>
                  <option>Interior Cleaning</option>
                  <option>Premium Detail Wash</option>
                  <option>Ceramic Coating</option>
                </select>

                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="w-full p-3 rounded-xl bg-[#1F2937] text-white outline-none"
                />

                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#1F2937] text-white outline-none"
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
                  className="flex-1 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold"
                >
                  Book
                </button>

              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}