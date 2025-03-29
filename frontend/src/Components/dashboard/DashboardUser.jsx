import React from "react";
import { RiLink } from "react-icons/ri";

const DashboardUser = () => {
  return (
      <div className="flex flex-col w-full min-h-screen p-6">
        {/* Program Saya */}
        <section className="mb-8 bg-white p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Program Saya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-md flex flex-col items-start"
              >
                <img
                  src="/assets/class/1.png"
                  alt="Program"
                  className="rounded-lg mb-4"
                />
                <div className="gap-2 flex flex-col w-full">
                    <h3 className="md:text-lg text-2xl font-semibold">General Class HSK 2</h3>
                    <p className="text-[#3377FF] flex items-center gap-2 text-sm"><RiLink /> Class Room</p>
                    <button className="mt-3 w-40 bg-[#FFCC00] text-black px-3 py-3 rounded-xl">
                        Kerjakan Ujian
                    </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Produk Saya */}
        <section className="bg-white p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Produk Saya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[
              { title: "E-Flashcard HSK 2", image: "/assets/product1.png" },
              { title: "Buku Tulis Mandarin", image: "/assets/product2.png" },
              { title: "E-Flashcard HSK 1", image: "/assets/product1.png" },
              { title: "E-Flashcard HSK 1", image: "/assets/product1.png" },
            ].map((product, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-md flex flex-col items-start"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="rounded-lg mb-4"
                />
                <div className="gap-2 flex flex-col w-full">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <button className="mt-3 w-40 bg-[#FFCC00] text-black px-3 py-3 rounded-xl">
                        Buka Produk
                    </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
  );
};

export default DashboardUser;
