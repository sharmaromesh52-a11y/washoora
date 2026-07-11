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
  bookings: Booking[];
  updateStatus: (id: number, status: string) => void;
  deleteBooking: (id: number) => void;
};

export default function BookingTable({
  bookings,
  updateStatus,
  deleteBooking,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-zinc-800 bg-zinc-900">

      <table className="w-full text-white">

        <thead className="bg-zinc-800">

          <tr>

            <th className="p-4 text-left">Customer</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Vehicle</th>
            <th className="p-4">Service</th>
            <th className="p-4">Address</th>
            <th className="p-4">Date</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>

          </tr>

        </thead>

        <tbody>

          {bookings.map((b) => (

            <tr
              key={b.id}
              className="border-t border-zinc-800 hover:bg-zinc-800/60 transition"
            >

              <td className="p-4 font-semibold">
                {b.customer_name}
              </td>

              <td className="text-center">
                <a
                  href={`tel:${b.phone}`}
                  className="text-cyan-400"
                >
                  {b.phone}
                </a>
              </td>

              <td className="text-center">
                {b.vehicle_type}
              </td>

              <td className="text-center">
                {b.service}
              </td>

              <td className="text-center">
                {b.address}
              </td>

              <td className="text-center">
                {b.booking_date}
              </td>

              <td className="text-center">

                <select
                  value={b.status}
                  onChange={(e) =>
                    updateStatus(b.id, e.target.value)
                  }
                  className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2"
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>

              </td>

              <td className="space-x-2 text-center">

                <a
                  href={`https://wa.me/91${b.phone}?text=${encodeURIComponent(
                    `Hi ${b.customer_name},

Your Washoora booking is "${b.status}".

Thank you.`
                  )}`}
                  target="_blank"
                  className="bg-green-600 px-3 py-2 rounded-xl"
                >
                  WhatsApp
                </a>

                <button
                  onClick={() => deleteBooking(b.id)}
                  className="bg-red-600 px-3 py-2 rounded-xl"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}