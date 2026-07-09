type Props = {
  total: number;
  pending: number;
  completed: number;
  cancelled: number;
};

export default function AdminStats({
  total,
  pending,
  completed,
  cancelled,
}: Props) {
  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">

      <div className="bg-blue-600 text-white rounded-2xl p-6 shadow">
        <p className="text-lg">Total Bookings</p>
        <h2 className="text-4xl font-bold mt-2">{total}</h2>
      </div>

      <div className="bg-yellow-500 text-white rounded-2xl p-6 shadow">
        <p className="text-lg">Pending</p>
        <h2 className="text-4xl font-bold mt-2">{pending}</h2>
      </div>

      <div className="bg-green-600 text-white rounded-2xl p-6 shadow">
        <p className="text-lg">Completed</p>
        <h2 className="text-4xl font-bold mt-2">{completed}</h2>
      </div>

      <div className="bg-red-600 text-white rounded-2xl p-6 shadow">
        <p className="text-lg">Cancelled</p>
        <h2 className="text-4xl font-bold mt-2">{cancelled}</h2>
      </div>

    </div>
  );
}