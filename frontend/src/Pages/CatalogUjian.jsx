import React, { useState, useEffect } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { useNavigate } from "react-router-dom";
import { getAllUjian } from "../api/ujian";
import { getMyPurchases } from "../api/transaksi";
import { Spin } from "antd";
import { formatRupiah } from "../utils/rupiahFormat";

const CatalogUjian = () => {
  const [loading, setLoading] = useState(true);
  const [dataUjian, setDataUjian] = useState([]);
  const navigate = useNavigate();
  const [ujianYangSudahDibeli, setUjianYangSudahDibeli] = useState([]);

  useEffect(() => {
    fetchUjian();
  }, []);

const fetchUjian = async () => {
  try {
    const res = await getAllUjian();
    const trxRes = await getMyPurchases();

    if (res.status) setDataUjian(res.data);
    if (trxRes.status && trxRes.data && Array.isArray(trxRes.data.ujian)) {
      setUjianYangSudahDibeli(trxRes.data.ujian);
    }
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  } finally {
    setLoading(false);
  }
};

  const handleClickUjian = (id) => {
    navigate(`/detail/${id}/ujian`);
  };

  return (
    <Mainlayouts>
      <div className="container mx-auto px-5">
        {loading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <Spin size="large" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-10">
            {dataUjian.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleClickUjian(item.id)}
                className="bg-white rounded-2xl border border-neutral-300 shadow-sm hover:shadow-lg transition cursor-pointer overflow-hidden"
              >
                <img
                  src={`${process.env.REACT_APP_API_IMG}${item.ujian_img}`}
                  alt={item.nama_ujian}
                  className="w-full aspect-video object-cover"
                />
                <div className="flex flex-col gap-1 p-4">
                  {ujianYangSudahDibeli.includes(item.id) && (
                    <p className="text-red-500 text-sm font-medium">
                      Anda sudah membeli ujian ini
                    </p>
                  )}
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {item.nama_ujian}
                  </h2>
                    {
                        item.harga_diskon && item.harga_diskon !== "0" ? (
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-red-500 line-through">
                                    {formatRupiah(item.harga_normal)}
                                </p>
                                <p className="text-lg text-gray-900">
                                    {formatRupiah(item.harga_diskon)}
                                </p>
                            </div>
                        ) : (
                            <>
                                <p className="text-lg text-gray-900">
                                    {formatRupiah(item.harga_normal)}
                                </p>
                            </>
                        )

                    }
                    <p className="text-sm text-blue-500">+ Certificate {formatRupiah(parseInt(item.harga_certif))}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Mainlayouts>
  );
};

export default CatalogUjian;
