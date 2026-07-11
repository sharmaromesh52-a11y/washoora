type Props = {
  total: number;
  onLogout: () => void;
};

export default function Header({ total, onLogout }: Props) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">

        <div>
          <h1 className="text-4xl font-extrabold text-white">
            Washoora Admin
          </h1>

          <p className="text-gray-400 mt-2">
            {today}
          </p>
        </div>

        <div className="flex gap-4">

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-3">
            <p className="text-sm text-gray-400">
              Total Bookings
            </p>

            <h2 className="text-3xl font-bold text-white">
              {total}
            </h2>
          </div>

          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 transition px-6 rounded-xl text-white font-semibold"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}