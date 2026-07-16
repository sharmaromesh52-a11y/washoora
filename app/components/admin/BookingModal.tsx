"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import StatusBadge from "./StatusBadge";
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

type Props = {
  booking: Booking | null;
  onClose: () => void;
  updateStatus: (id: number, status: string) => void;
  deleteBooking: (id: number) => void;
};

export default function BookingModal({
  booking,
  onClose,
  updateStatus,
  deleteBooking,
}: Props) {
    const [beforePhoto, setBeforePhoto] = useState<File | null>(null);
  const [afterPhoto, setAfterPhoto] = useState<File | null>(null);
  const handleBeforePhoto = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (e.target.files?.[0]) {
    setBeforePhoto(e.target.files[0]);
  }
};

const handleAfterPhoto = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (e.target.files?.[0]) {
    setAfterPhoto(e.target.files[0]);
  }
};
  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-zinc-900 rounded-3xl p-8 w-full max-w-xl border border-zinc-700">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">
            Booking Details
          </h2>

          <button
            onClick={onClose}
            className="text-white text-3xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">

          <Item title="Customer" value={booking.customer_name} />
          <Item title="Phone" value={booking.phone} />
          <Item title="Vehicle" value={booking.vehicle_type} />
          <Item title="Service" value={booking.service} />
          <Item title="Address" value={booking.address} />
          <Item title="Date" value={booking.booking_date} />
          <Item title="Time" value={booking.booking_time} />
          <div className="grid grid-cols-2 gap-4">

  <label className="border-2 border-dashed border-zinc-700 rounded-xl p-4 text-center cursor-pointer hover:border-cyan-500">

    <Camera className="mx-auto mb-2" />

    <p className="text-white">
      Before Wash Photo
    </p>

    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) =>
        setBeforePhoto(e.target.files?.[0] || null)
      }
    />

    {beforePhoto && (
      <p className="text-green-400 mt-2 text-sm">
        {beforePhoto.name}
      </p>
    )}

  </label>

  <label className="border-2 border-dashed border-zinc-700 rounded-xl p-4 text-center cursor-pointer hover:border-green-500">

    <Camera className="mx-auto mb-2" />

    <p className="text-white">
      After Wash Photo
    </p>

    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) =>
        setAfterPhoto(e.target.files?.[0] || null)
      }
    />

    {afterPhoto && (
      <p className="text-green-400 mt-2 text-sm">
        {afterPhoto.name}
      </p>
    )}

  </label>

</div>

          <div>
            <p className="text-zinc-400 mb-2">
              Status
            </p>
            <div className="mb-3">
  <StatusBadge status={booking.status} />
</div>

            <select
              value={booking.status}
              onChange={(e) =>
                updateStatus(booking.id, e.target.value)
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white"
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>

          </div>

        </div>

        <div className="grid grid-cols-5 gap-3 mt-8">

<a
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    booking.address
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-cyan-600 text-white text-center py-3 rounded-xl"
>
  Open Map
</a>
          <a
  href={`tel:${booking.phone}`}
  className="bg-blue-600 text-white text-center py-3 rounded-xl"
>
  Call
</a>

<button
  onClick={() => {
    if (!beforePhoto && !afterPhoto) {
      alert("Please select at least one photo.");
      return;
    }

    alert("Photo upload feature coming in next step.");
  }}
  className="bg-purple-600 text-white rounded-xl py-3"
>
  Upload
</button>

         <a
  href={`https://wa.me/91${booking.phone}`}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-green-600 text-white text-center py-3 rounded-xl"
>
            WhatsApp
          </a>

          <button
            onClick={() => {
              deleteBooking(booking.id);
              onClose();
            }}
            className="bg-red-600 text-white rounded-xl"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

function Item({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-zinc-400 text-sm">
        {title}
      </p>

      <p className="text-white text-lg font-semibold">
        {value}
      </p>
    </div>
  );
}