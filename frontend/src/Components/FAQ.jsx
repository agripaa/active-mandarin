import { Collapse } from "antd";
import { PlusOutlined } from "@ant-design/icons"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFaq } from "../Store/Action/getAllDatas";

const Faq = ({ text }) => {
    const { Panel } = Collapse
    const dispatch = useDispatch()
    const { faq } = useSelector(state => state.faqReducer)
    const { langs } = useSelector(state => state.LangReducer)

    useEffect(() => {
        dispatch(getFaq())
    }, [])

    return(
        <div className="container m-auto py-20 px-5 md:px-10">
            <div className="text-center">
                <h1 className="text-2xl lg:text-4xl font-semibold text-[#D15254]">{text.title}</h1>
                <h2 className="text-3xl lg:text-6xl font-semibold text-[#02264A] my-5">{text.tags}</h2>
            </div>
            <Collapse size='large' ghost expandIcon={() => <PlusOutlined />} expandIconPosition="end">
                {
                    faq.map((item, index) => 
                        <Panel className="panels my-10" header={<span className="text-2xl font-bold">{item.question[langs ? 'english' : 'indonesia' ]}</span>} key={index}>
                            {item.answer[langs ? 'english' : 'indonesia' ]}
                        </Panel>
                    )
                }
            </Collapse>
        </div>
    )
}

export default Faq