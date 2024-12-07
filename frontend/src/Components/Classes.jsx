import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import Buttons from "./Buttons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClass } from "../Store/Action/getAllDatas";
import CardClasses from "./CardClass";

const Classes = ({ title, button }) => {
    const dispatch = useDispatch()
    const { classes } = useSelector(state => state.classReducer)
    const filters = useState({
        page: 1,
        limit: 4
    })
    useEffect(() => {
        dispatch(getClass(filters[0]))
    }, [])
    return(
        <div className="classes bg-[#181B3F] px-5">
            <div className="bg-gradient-to-r from-[#181B3F] via-[#181B3F] to-transparent text-white">
                <div className="container mx-auto py-20">
                    <h1 className="text-3xl text-center lg:w-1/5 sm:w-1/2 w-full m-auto">{title}</h1>
                    <Row gutter={[16, 16]} className="py-10">
                        {
                            classes.map((item,index) => 
                                <Col key={index} xs={{ span: 12, offset: 0 }} lg={{ span: 6, offset: 0 }}>
                                    <CardClasses data={item}/>
                                </Col>
                            )
                        }
                    </Row>
                    <div className="text-center">
                        <Link to="/class">
                            <Buttons>{button}</Buttons>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Classes