import React, { useState, useEffect } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getClass } from "../Store/Action/getAllDatas";
import CardClasses from "../Components/CardClass";

const Catalog = () => {
    const [ filter, setFilter ] = useState('')
    const { data, langs } = useSelector(state => state.LangReducer)
    const { classes } = useSelector(state => state.classReducer)
    const dispatch = useDispatch()
    const text = langs ? data?.english : data?.indonesia

    useEffect(() => {
        dispatch(getClass())
    }, [dispatch])

    useEffect(() => {
        dispatch(getClass({ search: filter }))
    }, [dispatch, filter])

    const category = ['', 'Mandarin', 'Taiwan']
    return(
        <Mainlayouts>
            <div className="container mx-auto px-5">
                <div className="py-10 text-center">
                    <h1 className="md:text-5xl text-3xl font-bold text-[#02264A]">{text?.classPageTitle}</h1>
                    <p className="md:text-2xl text-lg font-reguler text-[#201F1F] mt-3">{text?.classPageDesc}</p>
                </div>
                <div className="w-full flex justify-center sm:overflow-hidden overflow-scroll gap-5 cates scroll-pl-6 snap-x">
                    <div className="min-w-[180px] bg-transparent snap-start md:hidden"></div>
                    {
                        category.map((item, index) => 
                            <div 
                            key={index} 
                            className={`snap-start py-2 w-[200px] min-w-[100px] transition ease-in-out text-center rounded-full border border-[#201F1F] cursor-pointer ${item.toLocaleLowerCase() === filter.toLocaleLowerCase() ? 'bg-[#201F1F] text-white' : 'bg-white'}`}
                            onClick={() => setFilter(item)}>{item === '' ? 'All' : item}</div>
                        )
                    }
                    <div className="min-w-[100px] bg-transparent snap-start md:hidden"></div>

                </div>
                <Row gutter={[8, 32]} className="py-10" align="stretch">
                    {
                        classes.map((item,index) => 
                            <Col key={index} xs={{ span: 12, offset: 0 }} lg={{ span: 6, offset: 0 }} className="px-0">
                                <CardClasses data={item}/>
                            </Col>
                        )
                    }
                </Row>
            </div>
        </Mainlayouts>
    )
}

export default Catalog