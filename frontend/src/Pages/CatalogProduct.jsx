import React, { useState, useEffect } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { useSelector } from "react-redux";
import { getGroupedBrands } from "../api/brand";
import { formatRupiah } from "../utils/rupiahFormat";
import { Spin } from "antd";

const CatalogProduct = () => {
  const { _, langs } = useSelector((state) => state.LangReducer);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getGroupedBrands();
      setProducts(response.data);
    } catch (error) {
      setError(error.message || "Gagal mengambil data produk.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
        <Mainlayouts>
            <div className="flex justify-center items-center h-[80vh]">
                <Spin size="large" />
            </div>
        </Mainlayouts>
    );
  }

  const handleClickItem = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      const openModalEvent = new CustomEvent("triggerLoginModal");
      window.dispatchEvent(openModalEvent); // trigger modal dari Header
    } else {
      window.location.href = `/detail/${id}`;
    }
  };

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
                    ? "To Enhance your learning in understanding Mandarin"
                    : "Untuk meningkatkan pembelajaran Anda dalam memahami bahasa Mandarin"}
                </span>
              </div>

              {loading ? (
                <p className="text-center text-lg text-gray-500">Loading...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : (
                <div className="my-8 flex w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
                    {products?.map((item, index) => (
                      <div key={index} className="p-0 m-0">
                        <div onClick={() => handleClickItem(item?.brands[0].id)} className="bg-white rounded-2xl border border-neutral-300 flex flex-col w-full h-full">
                          <img
                            src={`${process.env.REACT_APP_API_IMG}${item.image}`}
                            alt={`${item.turunan_brand}`}
                            className="w-full h-56 object-cover rounded-t-2xl"
                          />
                          <div className="flex flex-col justify-between items-start px-4 py-5">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                              {item.turunan_brand}
                            </h2>
                            <p className="font-semibold text-lg mb-2">
                              {formatRupiah(item.start_from_price)}
                              <span className="font-light text-sm ml-1">
                                {langs ? "/Item" : "/Item"}
                              </span>
                            </p>
                            <div className="flex mt-2">
                              <span className="text-sm text-[#3377FF]">
                                {langs
                                  ? `Earn commission Rp ${formatRupiah(item.commission)}`
                                  : `Dapatkan komisi Rp ${formatRupiah(item.commission)}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Mainlayouts>
  );
};

export default CatalogProduct;
