export default function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      text: "Excellent doorstep service. My car looked brand new after the wash. Highly recommended!",
    },
    {
      name: "Amit Verma",
      text: "Professional team, affordable pricing and great attention to detail. Will book again.",
    },
    {
      name: "Neha Singh",
      text: "Very convenient service at home. The interior cleaning was amazing.",
    },
  ];

  return (
    <section className="bg-[#08111F] py-24 px-6 text-white">
      <div className="max-w-7xl mx-auto">

        <p className="text-blue-400 uppercase tracking-[5px] text-center font-semibold">
          TESTIMONIALS
        </p>

        <h2 className="text-5xl font-bold text-center mt-4">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-[#111827] border border-gray-800 rounded-3xl p-8 hover:border-blue-500 hover:-translate-y-2 transition duration-300"
            >
              <div className="text-yellow-400 text-2xl mb-4">
                ★★★★★
              </div>

              <p className="text-gray-300 leading-7 mb-6">
                "{review.text}"
              </p>

              <h3 className="font-bold text-xl">
                {review.name}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}