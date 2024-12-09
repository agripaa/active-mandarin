import React, { useState, useEffect } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { useDispatch, useSelector } from "react-redux";
import { getClass } from "../Store/Action/getAllDatas";
import CardClasses from "../Components/CardClass";
import { Row, Col } from "antd";

const Catalog = () => {
  const [filter, setFilter] = useState("");
  const { data, langs } = useSelector((state) => state.LangReducer);
  // Dummy data for testing
  const dummyClasses = [
    {
      title: "Start to Mandarin",
      price: 100000,
      discountPrice: 80000,
      star: 4,
      level: 2,
    },
    {
      title: "Advance Mandarin",
      price: 150000,
      discountPrice: 120000,
      star: 5,
      level: 3,
    },
    {
      title: "Taiwanese Culture",
      price: 120000,
      discountPrice: 100000,
      star: 3,
      level: 1,
    },
    {
      title: "Business Mandarin",
      price: 200000,
      discountPrice: 180000,
      star: 5,
      level: 3,
    },
    {
      title: "Mandarin",
      price: 90000,
      discountPrice: 70000,
      star: 4,
      level: 2,
    },
  ];

  const { classes = [] } = useSelector((state) => state.classReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClass());
  }, [dispatch]);

  const category = ["All", "Mandarin", "Taiwan"];

  const filteredClasses =
    filter === "All"
      ? dummyClasses
      : dummyClasses.filter((item) => item.title.includes(filter));

  return (
    <Mainlayouts>
      <div className="container mx-auto px-5">
        <div className="py-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-6">
            {langs ? "Suggested Class" : "Kelas Yang Di Sarankan"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dummyClasses.slice(0, 3).map((item, index) => (
              <div key={index}>
                <CardClasses data={item} />
              </div>
            ))}
          </div>
        </div>

        <div className="py-10">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-6">
                {langs ? "Class Catalog" : "Katalog Kelas"}
              </h2>
              <span className="font-light">
                {langs
                  ? "Find the premium class and opportunities along the way"
                  : "Temukan kelas premium dan peluang di sepanjang jalan"}
              </span>
            </Col>
            <Col xs={24} md={12}>
              <div className="flex justify-end space-x-4 my-5">
                {category.map((item, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-md border text-center transition ${
                      filter.toLowerCase() === item.toLowerCase()
                        ? "bg-amber-400 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => setFilter(item === "All" ? "" : item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </Col>
          </Row>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {filteredClasses.map((item, index) => (
              <div key={index}>
                <CardClasses data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Mainlayouts>
  );
};

export default Catalog;
