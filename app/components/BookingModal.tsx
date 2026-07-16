"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    car: "",
    service: "",
    area: "Modi Road", // default main area selection
    addressDetails: "",
    date: "",
    time: "10:00 AM",
  });

  const jhunjhunuAreas = [
    "Modi Road",
    "Kamal Heights Area",
    "Churu Bypass",
    "Mandawa Mode",
    "Guda Mode",
    "Collectorate Area",
    "Road No. 1 to 3",
    "Housing Board",
    "Khemi Shakti Temple Area",
    "Other Area (Jhunjhunu)"
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    if (
      !form.name ||
      !form.phone ||
      !form.car ||
      !form.service ||
      !form.addressDetails ||
      !form.date
    ) {
      alert("Please fill all configuration fields before deploying order.");
      return;
    }

    setIsSubmitting(true);

    // Combine Area Dropdown and Specific Block details for Master DB Schema
    const completeAddress = `${form.area} - ${form.addressDetails}, Jhunjhunu`;

    try {
      const { error } = await supabase.from("bookings").insert([
        {
          customer_name: form.name,
          phone: form.phone,
          vehicle_type: form.car,
          service: form.service,
          address: completeAddress,
          booking_date: form.date,
          booking_time: form.time,
          status: "Pending",
        },
      ]);

      if (error) throw error;
      setIsSuccess(true);
    } catch (err: any) {
      alert("Database Synchronization Failed: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const completeAddress = `${form.area} - ${form.addressDetails}, Jhunjhunu`;
    const msg = `🚗 *New Washoora Booking* \n\nName: ${form.name}\nPhone: ${form.phone}\nVehicle: ${form.car}\nService: ${form.service}\nAddress: ${completeAddress}\nDate/Time: ${form.date} | ${form.time}`;
    
    window.open(
      `https://wa.me/919511539740?text=${encodeURIComponent(msg)}`,
      "_blank"
    );

    setOpen(false);
    setIsSuccess(false);
    setForm({
      name: "",
      phone: "",
      car: "",
      service: "",
      area: "Modi Road",
      addressDetails: "",
      date: "",
      time: "10:00 AM",
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-green-500 hover:bg-green-600 px-8 py-3.5 rounded-full font-bold transition-all duration-200 text-white shadow-lg shadow-green-500/20 active:scale-95"
      >
        Book Doorstep Wash
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 overflow-y-auto p-4 backdrop-blur-sm">
          <div className="bg-[#111827] border border-gray-800 w-full max-w-lg rounded-3xl p-8 my-10 relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            
            {!isSuccess ? (
              <>
                <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                  Book Car/Bike Wash
                </h2>
                <p className="text-xs text-zinc-400 mb-6 uppercase tracking-wider font-semibold">Premium Home Service Portal</p>

                <div className="space-y-4 font-mono text-xs">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full p-3.5 rounded-xl bg-[#1F2937] border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                  />

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Mobile Number (e.g. 9511539740)"
                    className="w-full p-3.5 rounded-xl bg-[#1F2937] border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                  />

                  <input
                    name="car"
                    value={form.car}
                    onChange={handleChange}
                    placeholder="Vehicle Model (Thar, Alto, Splendor...)"
                    className="w-full p-3.5 rounded-xl bg-[#1F2937] border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                  />

                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full p-3.5 rounded-xl bg-[#1F2937] border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                  >
                    <option value="">Select Detailing Profile</option>
                    <option value="Exterior Wash (₹199)">Exterior Wash (₹199)</option>
                    <option value="Interior Detailing (₹399)">Interior Detailing (₹399)</option>
                    <option value="Bike/Scooty Wash (₹79)">Bike/Scooty Wash (₹79)</option>
                  </select>

                  {/* Regional Area Filter Selection Nodes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select
                      name="area"
                      value={form.area}
                      onChange={handleChange}
                      className="w-full p-3.5 rounded-xl bg-[#1F2937] border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                    >
                      {jhunjhunuAreas.map((areaName, i) => (
                        <option key={i} value={areaName}>{areaName}</option>
                      ))}
                    </select>

                    <input
                      name="addressDetails"
                      value={form.addressDetails}
                      onChange={handleChange}
                      placeholder="House / Flat No / Street"
                      className="w-full p-3.5 rounded-xl bg-[#1F2937] border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full p-3.5 rounded-xl bg-[#1F2937] border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                    />
                    <select
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className="w-full p-3.5 rounded-xl bg-[#1F2937] border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                    >
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 mt-8 font-sans">
                  <button
                    onClick={() => setOpen(false)}
                    disabled={isSubmitting}
                    className="flex-1 py-3 rounded-xl border border-gray-700 hover:bg-gray-800 text-zinc-400 hover:text-white text-sm font-semibold transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submit}
                    disabled={isSubmitting}
                    className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-lg shadow-blue-600/20 transition disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing Node..." : "Confirm Booking"}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 font-sans">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto text-3xl mb-4 shadow-lg shadow-green-500/10 border border-green-500/30">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Booking Synchronized!</h3>
                <p className="text-zinc-400 text-sm mt-2 px-4">
                  Romesh bhai, aapka data matrix table me securely save ho gaya hai aur dashboard par refresh ho chuka hai.
                </p>

                <div className="bg-[#000000] p-4 rounded-xl border border-gray-800 text-left my-6 font-mono text-xs text-zinc-400 space-y-1">
                  <p><span className="text-zinc-600">ORDER_ID:</span> <span className="text-white">WSH-{Math.floor(1000 + Math.random() * 9000)}</span></p>
                  <p><span className="text-zinc-600">LOCATION:</span> <span className="text-white font-sans">{form.area}</span></p>
                  <p><span className="text-zinc-600">PROFILE:</span> <span className="text-white font-sans">{form.service}</span></p>
                  <p><span className="text-zinc-600">SCHEDULE:</span> <span className="text-white">{form.date} [{form.time}]</span></p>
                </div>

                <div className="space-y-2 mt-6">
                  <button
                    onClick={handleWhatsAppRedirect}
                    className="w-full py-3.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm transition tracking-wide flex items-center justify-center gap-2"
                  >
                    Send WhatsApp Update
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      setIsSuccess(false);
                    }}
                    className="w-full py-2.5 text-zinc-500 hover:text-zinc-400 text-xs font-semibold"
                  >
                    Go Back to Home Page
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}