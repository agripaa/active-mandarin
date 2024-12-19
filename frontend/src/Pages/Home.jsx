import React from "react";
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
import Upcoming from "../Components/Upcoming";
import Supports from "../Components/Supports";
import Faq from "../Components/FAQ";
import { useSelector } from "react-redux";
import Tags from "../Components/Tags";
import Prospect from "../Components/ Prospect";

const Homes = () => {
    const { data, langs } = useSelector(state => state.LangReducer)
    const text = langs ? data?.english : data?.indonesia

    return(
        <Mainlayouts>
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
            <Sponsors 
                text={{ 
                    tags: text?.sponsorsTags, 
                    button: text?.sponsorsCTA
            }}/>
            <Works 
                text={{ 
                    title: text?.workflowTitle,
                    desc: text?.workflowDesc
                    }}
                cards={text?.workflowCards}
            />
            <Affiliate text={{
                title: text?.affiliateTitle,
                desc: text?.affliateDesc
            }}/>
            <Products text={{ 
                title: text?.productsTitle,
                tags: text?.productsTags, 
                desc: text?.productsDesc,
                productDesc1: text?.productItemDesc1,
                productDesc2: text?.productItemDesc2
            }} />
            <Oprec text={{
                title: text?.oprecTitle,
                desc: text?.oprecDesc
            }}/>
            <Classes 
                title={text?.classTitle} 
                button={text?.viewButton}
            />
            <Prospect text={{ 
                title: text?.prospectTitle,
                tags: text?.prospectTags,
                source: text?.prospectSource,
                head: text?.prospectheadCareer,
                careers: text?.careers
             }}/>
            <Lectures text={{ 
                title: text?.lectureTitle, 
                tags: text?.lectureTags
            }} />
            <Moments 
                text={{ 
                    title: text?.momentsTitle, 
                    tags: text?.momentsTags
                }} />
            <Testimony 
                text={{ 
                    title: text?.testimonyTitle, 
                    tags: text?.testimonyTags
                }} />
            {/* <Upcoming text={{title: text?.eventTitle, tags: text?.eventTags, button: text?.viewButton}} /> */}
            <Faq text={{title: text?.help, tags: text?.faqTags}}/>
            {/* <Supports text={{ title: text?.donateTitle, desc: text?.donateDesc, button: text?.donateButton}}/> */}
        </Mainlayouts>
    )
}

export default Homes