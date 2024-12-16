import React, { useEffect, useState } from "react";
import Headers from "../Components/Header";
import Footers from "../Components/Footer";
import { FloatButton } from "antd";
import { UpOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import Donation from "../Components/Donation";
import { useDispatch, useSelector } from "react-redux";
import { getLanguage } from "../Store/Action/LangAction";
import ButtonWhatsapp from "../Components/ButtonWhatsapp";

const Mainlayouts = ({ children }) => {
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
                tags: text?.donationTag
             }} />
            <Headers collapse={collapse} funcs={onClose}/>
            <main style={{ minHeight: '60vh'}}>{children}</main>
            <ButtonWhatsapp />
            <Footers/>
            { !collapse ? <FloatButton.BackTop icon={<UpOutlined />}/> : null}
        </>
    )
}

export default Mainlayouts