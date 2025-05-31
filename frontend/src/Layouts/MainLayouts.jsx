import React, { useEffect, useState } from "react";
import Headers from "../Components/Header";
import Footers from "../Components/Footer";
import { FloatButton } from "antd";
import { UpOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import Donation from "../Components/Donation";
import { useDispatch, useSelector } from "react-redux";
import { getLanguage } from "../Store/Action/LangAction";

const Mainlayouts = ({ children, className, footerClassName }) => {
    const [collapse, setCollapse] = useState(false)
    const { data, langs } = useSelector(state => state.LangReducer)
    const text = langs ? data?.english : data?.indonesia
    const location = useLocation();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLanguage())
    }, [dispatch])
    useEffect(() => {
        window.scrollTo(0, 0);
        setCollapse(false)
    }, [location]);

    const onClose = () => setCollapse(!collapse)
    return(
        <>
            <Donation text={{ 
                title: text?.donationTitle,
                tags: text?.donationTag,
                btn: text?.donationBtn
             }} />
            <Headers collapse={collapse} funcs={onClose}/>
            <main style={{ minHeight: '60vh'}} className={className}>{children}</main>
            <Footers footerClassName={footerClassName} />
            { !collapse ? <FloatButton.BackTop icon={<UpOutlined />}/> : null}
        </>
    )
}

export default Mainlayouts