import React, { useEffect } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import Heros from "../Components/Heros";
import Sponsors from "../Components/Sponsors";
import Works from "../Components/Works";
import Oprec from '../Components/Oprec';
import Products from "../Components/Products";
import Classes from "../Components/Classes";
import Lectures from "../Components/Lectures";
import Moments from "../Components/Moments";
import Testimony from "../Components/Testimony";
import Affiliate from "../Components/Affiliate";
import Faq from "../Components/FAQ";
import { useSelector } from "react-redux";
import Tags from "../Components/Tags";
import { useLocation } from "react-router-dom";
import Prospect from "../Components/ Prospect";

const Homes = () => {
    const { data, langs } = useSelector(state => state.LangReducer)
    const text = langs ? data?.english : data?.indonesia
    const location = useLocation();


    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }    
    }, [location])

    return(
        <Mainlayouts className="bg-background" footerClassName={"bg-background"}>
            <div className="w-full relative">
                <Heros text={{
                    title: text?.herosTitle, 
                    desc: text?.herosDesc, 
                    btn: text?.herosBtn,
                    actionDesc: text?.herosActionDesc,
                    listInformation: text?.herosListInformation
                }}/>
                <Tags text={{ 
                    regist: text?.tagsRegistrant,
                    participants: text?.tagsParticipant,
                    skill: text?.tagsEnhancement
                }}/>
            </div>
            <Sponsors 
                text={{ 
                    tags: text?.sponsorsTags, 
                    button: text?.sponsorsCTA
                }}/>
            <Works />
            <Products text={{ 
                title: text?.productsTitle,
                tags: text?.productsTags, 
                desc: text?.productsDesc,
                productDesc1: text?.productItemDesc1,
                productDesc2: text?.productItemDesc2
            }} />
            <Testimony 
                text={{ 
                    title: text?.testimonyTitle, 
                    tags: text?.testimonyTags
                }} />
            <Lectures text={{ 
                title: text?.lectureTitle, 
                tags: text?.lectureTags
            }} />
            <Prospect text={{ 
                title: text?.prospectTitle,
                tags: text?.prospectTags,
                source: text?.prospectSource,
                head: text?.prospectheadCareer,
                careers: text?.careers
             }}/>
            <Affiliate text={{
                title: text?.affiliateTitle,
                desc: text?.affliateDesc
            }}/>
            <Moments 
                text={{ 
                    title: text?.momentsTitle, 
                    tags: text?.momentsTags
                }} />
                <Oprec text={{
                    title: text?.oprecTitle,
                    desc: text?.oprecDesc
                }}/>
            {/* <Classes 
                title={text?.classTitle} 
                button={text?.viewButton}
            /> */}
            {/* <Upcoming text={{title: text?.eventTitle, tags: text?.eventTags, button: text?.viewButton}} /> */}
            <Faq text={{title: text?.help, tags: text?.faqTags}}/>
            {/* <Supports text={{ title: text?.donateTitle, desc: text?.donateDesc, button: text?.donateButton}}/> */}
        </Mainlayouts>
    )
}

export default Homes