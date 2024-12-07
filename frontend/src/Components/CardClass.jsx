import React from "react";
import { HiOutlineUsers } from "react-icons/hi"
import { StarFilled } from '@ant-design/icons'
import { Link } from "react-router-dom";
import { Row, Col } from "antd"

const CardClasses = ({ data }) => {
    const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return(
        <Link to='https://wa.link/4hhjtd' target="_blank">
            <div className="md:px-3 transition ease-in px-0 py-5 bg-white md:rounded-2xl rounded text-[#02264A] md:min-h-[280px] min-h-[2r0px] hover:drop-shadow-md">
                <img src="/assets/dummy.png" alt="card" className="w-full"/>
                <div className="md:px-0 px-3">
                    <h1 className="md:text-xl text-sm font-semibold mt-8 min-h-[35px] md:min-h-0 md:mb-4">{data?.title}</h1>
                    <Row align="middle" justify="space-between" gutter={[0, 8]}>
                        <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 8 }} className="flex items-center gap-2 text-[#7A7778] sm:text-lg text-sm font-medium">
                            <HiOutlineUsers/> {data?.student} <span>Students</span>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 3 }} xl={{ span: 2 }} className="flex items-center gap-2 text-[#7A7778] sm:text-lg text-sm font-medium">
                            <span className="text-[#FAC917]"><StarFilled /></span>{data?.rating}
                        </Col>
                        <Col xs={{ span: 24 }} xl={{ span: 8 }}>
                            <h2 className="md:text-xl text-sm font-semibold">Rp.{addCommas(data?.price)}</h2>
                        </Col>
                    </Row>
                </div>
            </div>
        </Link>
    )
}

export default CardClasses