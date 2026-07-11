type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-6">
      <div className="relative">

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by customer, phone, vehicle..."
          className="
          w-full
          bg-zinc-900
          border
          border-zinc-800
          rounded-2xl
          px-5
          py-4
          text-white
          placeholder:text-gray-500
          focus:outline-none
          focus:border-cyan-500
          transition
          "
        />

      </div>
    </div>
  );
}