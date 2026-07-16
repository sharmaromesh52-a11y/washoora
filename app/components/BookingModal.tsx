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
    area: "Modi Road",
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
      alert("Please fill all fields before submitting.");
      return;
    }

    setIsSubmitting(true);
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
      alert("Database error: " + err.message);
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
      <div className="flex justify-center my-4">
        <button
          onClick={() => setOpen(true)}
          className="bg-green-500 hover:bg-green-600 px-8 py-3.5 rounded-full font-bold transition-all text-white shadow-lg shadow-green-500/20 active:scale-95 text-sm"
        >
          Book Doorstep Wash
        </button>
      </div>

      {open && (
        /* 🛠️ HARD LOCK LAYER: Pure fixed view blocking overlay with zero overflow leak */
        <div className="fixed inset-0 w-screen h-screen bg-black/80 flex items-center justify-center z-[9999] backdrop-blur-md p-4 overflow-hidden">
          <div 
            className="bg-[#111827] border border-gray-800 w-full max-w-md rounded-3xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            
            {!isSuccess ? (
              <>
                <div className="mb-4">
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    Book Car/Bike Wash
                  </h2>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold mt-0.5">Premium Home Service Portal</p>
                </div>

                <div className="space-y-3 font-mono text-xs flex-1">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full p-3 rounded-xl bg-[#1F2937] border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                  />

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="w-full p-3 rounded-xl bg-[#1F2937] border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                  />

                  <input
                    name="car"
                    value={form.car}
                    onChange={handleChange}
                    placeholder="Vehicle Model (Thar, Splendor...)"
                    className="w-full p-3 rounded-xl bg-[#1F2937] border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                  />

                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-[#1F2937] border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                  >
                    <option value="">Select Detailing Profile</option>
                    <option value="Exterior Wash (₹199)">Exterior Wash (₹199)</option>
                    <option value="Interior Detailing (₹399)">Interior Detailing (₹399)</option>
                    <option value="Bike/Scooty Wash (₹79)">Bike/Scooty Wash (₹79)</option>
                  </select>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <select
                      name="area"
                      value={form.area}
                      onChange={handleChange}
                      className="w-full p-3 rounded-xl bg-[#1F2937] border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                    >
                      {jhunjhunuAreas.map((areaName, i) => (
                        <option key={i} value={areaName}>{areaName}</option>
                      ))}
                    </select>

                    <input
                      name="addressDetails"
                      value={form.addressDetails}
                      onChange={handleChange}
                      placeholder="House / Street"
                      className="w-full p-3 rounded-xl bg-[#1F2937] border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full p-3 rounded-xl bg-[#1F2937] border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                    />
                    <select
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className="w-full p-3 rounded-xl bg-[#1F2937] border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                    >
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 font-sans">
                  <button
                    onClick={() => setOpen(false)}
                    disabled={isSubmitting}
                    className="flex-1 py-2.5 rounded-xl border border-gray-700 hover:bg-gray-800 text-zinc-400 hover:text-white text-sm font-semibold transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submit}
                    disabled={isSubmitting}
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
                  >
                    {isSubmitting ? "Processing..." : "Confirm Booking"}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4 font-sans">
                <div className="w-14 h-14 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto text-2xl mb-3 border border-green-500/30">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Booking Synchronized!</h3>
                <p className="text-zinc-400 text-xs mt-1.5 px-2">
                  Romesh bhai, aapka data matrix table me securely save ho gaya hai.
                </p>

                <div className="bg-[#000000] p-3 rounded-xl border border-gray-800 text-left my-4 font-mono text-xs text-zinc-400 space-y-1">
                  <p><span className="text-zinc-600">LOCATION:</span> <span className="text-white font-sans">{form.area}</span></p>
                  <p><span className="text-zinc-600">PROFILE:</span> <span className="text-white font-sans">{form.service}</span></p>
                  <p><span className="text-zinc-600">SCHEDULE:</span> <span className="text-white">{form.date} [{form.time}]</span></p>
                </div>

                <div className="space-y-2 mt-4">
                  <button
                    onClick={handleWhatsAppRedirect}
                    className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm transition tracking-wide"
                  >
                    Send WhatsApp Update
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      setIsSuccess(false);
                    }}
                    className="w-full py-2 text-zinc-500 hover:text-zinc-400 text-xs font-semibold"
                  >
                    Go Back to Home
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