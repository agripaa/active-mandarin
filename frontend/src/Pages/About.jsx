import React, { useState, useEffect } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAbout } from "../Store/Action/getAllDatas";
import { url } from "../Store/Config/url";

const About = () => {
  const { data, langs } = useSelector((state) => state.LangReducer);
  const { about } = useSelector((state) => state.aboutReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAbout("2023"));
  }, [dispatch]);

  return (
    <Mainlayouts>
      <div className="container mx-auto px-5 md:px-10 py-10">
        <Row gutter={[32, 32]} align="middle">
          {/* Left Column: Image */}
          <Col xs={24} md={12}>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src="assets/about.png"
                alt="About"
                className="w-full object-cover"
              />
            </div>
          </Col>
          {/* Right Column: Text */}
          <Col xs={24} md={12}>
            <div className="sp">
              <h1 className="text-xl md:text-xl font-bold text-[#02264A]">
                {langs
                  ? "Started to Migrate to the Bamboo Curtain Country"
                  : "Memulai Merantau ke Negeri Tirai Bambu"}
              </h1>
              <p className="text-md md:text-lg text-gray-600">
                {langs ? "Congrats" : "Selamat"}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </Mainlayouts>
  );
};

export default About;
