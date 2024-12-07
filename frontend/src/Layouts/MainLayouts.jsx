import React, { useEffect, useState } from "react";
import Headers from "../Components/Header";
import Footers from "../Components/Footer";
import { FloatButton } from "antd";
import { UpOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLanguage } from "../Store/Action/LangAction";

const Mainlayouts = ({ children }) => {
    const [collapse, setCollapse] = useState(false)
    const { load } = useSelector(state => state.loadingScreen)
    const location = useLocation();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLanguage())
    }, [])
    useEffect(() => {
        window.scrollTo(0, 0);
        setCollapse(false)
    }, [location]);

    const onClose = () => setCollapse(!collapse)
    return(
        load ? (
            <div className="min-h-[90vh]">
                <div className="loadings"></div>
            </div>
        ) : 
        <>
            <Headers collapse={collapse} funcs={onClose}/>
            <main style={{ minHeight: '60vh'}}>{children}</main>
            <Footers/>
            { !collapse ? <FloatButton.BackTop icon={<UpOutlined />}/> : null}
        </>
    )
}

export default Mainlayouts