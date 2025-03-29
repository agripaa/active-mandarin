import React from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { useSelector } from "react-redux";

const CatalogProduct = () => {
  const { _, langs } = useSelector((state) => state.LangReducer);

  const dummyClasses = {
    indonesia: [
      {
        title: "Hanzi Practiced Book",
        price: "24.000",
        image: "/assets/product1.png",
      },
      {
        title: "E-Flashcard",
        price: "3.000.000",
        image: "/assets/product2.png",
      },
      {
        title: "E-Flashcard",
        price: "3.000.000",
        image: "/assets/product2.png",
      },
    ],
    english: [
      {
        title: "Hanzi Practiced Book",
        price: "24,000",
        image: "/assets/product1.png",
      },
      {
        title: "E-Flashcard",
        price: "249,000",
        image: "/assets/product2.png",
      },
      {
        title: "E-Flashcard",
        price: "3.000.000",
        image: "/assets/product2.png",
      },
    ],
  };

  const translateClass = langs
    ? dummyClasses?.english
    : dummyClasses?.indonesia;


  return (
    <Mainlayouts>
        <section>
            <div className="container mx-auto px-5 lg:px-0">
                <div className="py-16">
                <div className="flex flex-col w-full">
                    <div className="w-full flex flex-col items-center mx-auto mb-6">
                    <h2 className="text-2xl md:text-4xl font-semibold text-[#02264A] mb-2">
                        {langs ? "Our Products" : "Produk Kami"}
                    </h2>
                    <span className="font-semibold text-[#8493AC] text-lg">
                        {langs
                        ? "To Enhanced your learning in understanding Mandarin"
                        : "Untuk meningkatkan pembelajaran Anda dalam memahami bahasa Mandarin"}
                    </span>
                    </div>
                    <div className="my-8 flex w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
                        {translateClass.map((item, index) => (
                            <div
                            key={index}
                            className="p-0 m-0"
                            >
                            <div className="bg-white rounded-2xl border border-neutral-300 flex flex-col w-full h-full">
                                <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover rounded-t-2xl"
                                />
                                <div className="flex flex-col justify-between items-start px-4 py-5">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    {item.title}
                                </h2>
                                <p className="font-semibold text-lg mb-2">
                                    Rp {item.price}
                                    <span className="font-light text-sm ml-1">
                                    {langs
                                        ? "/Month"
                                        : "/Bulan"}
                                    </span>
                                </p>
                                <div className="flex mt-2">
                                    <span className="text-sm text-[#3377FF]">Dapatkan komisi Rp Rp224.950</span>
                                </div>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    </Mainlayouts>
  );
};

export default CatalogProduct;
