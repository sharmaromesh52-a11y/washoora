import Image from "next/image";

export default function Gallery() {
  const images = [
    "/gallery1.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
    "/gallery5.jpg",
    "/gallery6.jpg",
    "/gallery7.jpg",
    "/gallery8.jpg",
  ];

  return (
    <section
      id="gallery"
      className="bg-[#08111F] py-24 px-6 text-white"
    >
      <div className="max-w-7xl mx-auto">

        <p className="text-blue-400 uppercase tracking-[5px] font-semibold text-center">
          OUR GALLERY
        </p>

        <h2 className="text-5xl font-bold text-center mt-4">
          Our Recent Work
        </h2>

        <p className="text-gray-400 text-center mt-5 max-w-3xl mx-auto">
          A glimpse of our premium doorstep car washing and detailing service.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">

          {images.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300 group"
            >
              <Image
                src={img}
                alt={`Gallery ${index + 1}`}
                width={500}
                height={500}
                className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}