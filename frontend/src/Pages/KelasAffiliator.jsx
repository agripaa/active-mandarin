import React, { useState, useEffect } from "react";
import { RiLink } from "react-icons/ri";
import { getUserTransactionsByCategory } from "../api/user";
import { Spin } from "antd";
import DashboardLayout from "../Layouts/DashboardLayout";

const KelasAffiliator = () => {
  const [programs, setPrograms] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserTransactions();
  }, []);

  const fetchUserTransactions = async () => {
    try {
      const programData = await getUserTransactionsByCategory("program");
      const productData = await getUserTransactionsByCategory("product");
      setPrograms(programData.data);
      setProducts(productData.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" className="flex justify-center items-center h-screen" />;
  }

  return (
    <DashboardLayout>

        <div className="flex flex-col w-full min-h-screen p-6">
            {/* Program Saya */}
            <section className="mb-8 bg-white p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Program Saya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {programs.length > 0 ? programs?.map((program, index) => (
                <div
                    key={index}
                    className="bg-white p-4 rounded-xl shadow-md flex flex-col items-start"
                >
                    <img
                    src={program.brand_image ? `${process.env.REACT_APP_API_IMG}${program.brand_image}` : "/assets/product-default.png"}
                    alt="Program"
                    className="rounded-lg mb-4"
                    />
                    <div className="gap-2 flex flex-col w-full">
                        <h3 className="md:text-lg text-2xl font-semibold">{program.item}</h3>
                        <p className="text-[#3377FF] flex items-center gap-2 text-sm">
                            <RiLink /> <a href={program.link_classroom} target="_blank" rel="noopener noreferrer">Class Room</a>
                        </p>
                        <div className="flex flex-col items-start mt-3 gap-2">
                        <button className="w-40 bg-[#ffcc003b] text-[#0000003c] px-3 py-3 rounded-xl " disabled={true}>
                            Kerjakan Ujian
                        </button>
                        <p className="text-xs ml-1">Coming Soon</p>
                        </div>
                    </div>
                </div>
                )) : (<div>
                    <p className="text-red-500">Program Belum Tersedia!.</p>
                    </div>)}
            </div>
            </section>

            {/* Produk Saya */}
            <section className="bg-white p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Produk Saya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {products.length > 0 ? products?.map((product, index) => (
                <div
                    key={index}
                    className="bg-white p-4 rounded-xl shadow-md flex flex-col items-start"
                >
                    <img
                    src={product.brand_image ? `${process.env.REACT_APP_API_IMG}${product.brand_image}` : "/assets/product-default.png"}
                    alt={product.item}
                    className="rounded-lg mb-4"
                    />
                    <div className="gap-2 flex flex-col w-full">
                        <h3 className="text-lg font-semibold">{product.item}</h3>
                        <button className="mt-3 w-40 bg-[#FFCC00] text-black px-3 py-3 rounded-xl">
                            <a href={process.env.REACT_APP_API_IMG + product.file_product} target="_blank" rel="noopener noreferrer">
                            Buka Produk
                            </a>
                        </button>
                    </div>
                </div>
                )) :(<div>
                <p className="text-red-500">Produk Belum Tersedia!.</p>
                </div>)}
            </div>
            </section>
        </div>
    </DashboardLayout>
  );
};

export default KelasAffiliator;
