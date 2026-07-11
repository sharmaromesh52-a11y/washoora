import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

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
  const cards = [
    {
      title: "Total Bookings",
      value: total,
      color: "from-cyan-500 to-blue-600",
      icon: <CalendarDays size={32} />,
    },
    {
      title: "Pending",
      value: pending,
      color: "from-yellow-500 to-orange-500",
      icon: <Clock3 size={32} />,
    },
    {
      title: "Completed",
      value: completed,
      color: "from-green-500 to-emerald-600",
      icon: <CheckCircle2 size={32} />,
    },
    {
      title: "Cancelled",
      value: cancelled,
      color: "from-red-500 to-pink-600",
      icon: <XCircle size={32} />,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`rounded-3xl bg-gradient-to-r ${card.color}
          text-white p-6 shadow-2xl
          hover:scale-[1.03]
          duration-300 cursor-pointer`}
        >
          <div className="flex justify-between items-center">

            <div>

              <p className="opacity-90 text-sm">
                {card.title}
              </p>

              <h2 className="text-4xl font-extrabold mt-3">
                {card.value}
              </h2>

            </div>

            <div className="bg-white/20 rounded-full p-4">
              {card.icon}
            </div>

          </div>
        </div>

      ))}

    </div>
  );
}