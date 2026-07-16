type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  const colors = {
    Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
    Confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/40",
    Completed: "bg-green-500/20 text-green-400 border-green-500/40",
    Cancelled: "bg-red-500/20 text-red-400 border-red-500/40",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold border ${
        colors[status as keyof typeof colors] ??
        "bg-zinc-700 text-white border-zinc-600"
      }`}
    >
      {status}
    </span>
  );
}