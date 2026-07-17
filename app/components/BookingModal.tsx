"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [service, setService] = useState("Exterior Wash");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // 🌐 GLOBAL LISTENERS FOR CARD ACTIONS
  useEffect(() => {
    const handleOpenModal = (e: any) => {
      setIsOpen(true);
      if (e.detail && e.detail.service) {
        setService(e.detail.service);
      }
    };

    window.addEventListener("open-booking-modal", handleOpenModal);
    return () => window.removeEventListener("open-booking-modal", handleOpenModal);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("bookings").insert([
      {
        customer_name: customerName,
        phone,
        vehicle_type: vehicleType,
        service,
        address,
        status: "Pending",
        booking_date: new Date().toISOString().split("T")[0],
      },
    ]);

    setLoading(false);
    if (error) {
      alert("Booking failed: " + error.message);
    } else {
      alert("Booking Successful! Our partner team will reach out shortly.");
      setIsOpen(false);
      setCustomerName("");
      setPhone("");
      setVehicleType("");
      setAddress("");
    }
  };

  return (
    <>
      {/* Dynamic Hidden Hook Anchor for global fallbacks */}
      <button 
        data-booking-trigger="true" 
        onClick={() => setIsOpen(true)} 
        className="hidden"
      />

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-[#171719] border border-zinc-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-4 right-4 text-zinc-500 hover:text-white font-bold"
            >
              ✕
            </button>
            <h2 className="text-xl font-black mb-1 text-white">Secure Dispatch Gateway</h2>
            <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-5">Confirm Coordinate Requirements</p>
            
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="text-zinc-400 block mb-1">Your Name</label>
                <input required type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full bg-[#000000] border border-zinc-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-[#1488fc]" />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">Mobile Link</label>
                <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-[#000000] border border-zinc-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-[#1488fc]" />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">Vehicle Model / Class</label>
                <input required type="text" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} placeholder="e.g., Swift Dzire, Bullet 350" className="w-full bg-[#000000] border border-zinc-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-[#1488fc]" />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">Target Package</label>
                <select value={service} onChange={(e) => setService(e.target.value)} className="w-full bg-[#000000] border border-zinc-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-[#1488fc]">
                  <option value="Exterior Wash">Exterior Wash (₹199)</option>
                  <option value="Interior Detailing">Interior Detailing (₹349)</option>
                  <option value="Bike/Scooty Wash">Bike/Scooty Wash (₹79)</option>
                </select>
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">Service Coordinate Address</label>
                <textarea required rows={3} value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-[#000000] border border-zinc-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-[#1488fc]" />
              </div>
              <button disabled={loading} type="submit" className="w-full py-3 bg-[#1488fc] text-white font-bold rounded-xl uppercase tracking-wider transition-all hover:bg-[#1488fc]/90">
                {loading ? "Processing..." : "Confirm Doorstep Booking"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}