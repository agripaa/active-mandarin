import React from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import Heros from "../Components/Heros";
import Sponsors from "../Components/Sponsors";
import Works from "../Components/Works";
import Products from "../Components/Products";
import Classes from "../Components/Classes";
import Lectures from "../Components/Lectures";
import Moments from "../Components/Moments";
import Testimony from "../Components/Testimony";
import Upcoming from "../Components/Upcoming";
import Supports from "../Components/Supports";
import Faq from "../Components/FAQ";
import { useSelector } from "react-redux";

const Homes = () => {
    const { data, langs } = useSelector(state => state.LangReducer)
    const text = langs ? data?.english : data?.indonesia
    console.log({data})
    return(
        <Mainlayouts>
            <Heros text={{title: text?.herosTitle, desc: text?.herosDesc}}/>
            <Sponsors text={{ tags: text?.sponsorsTags, button: text?.sponsorsCTA}}/>
            <Works 
                text={{ 
                    title: text?.workflowTitle,
                    desc: text?.workflowDesc
                    }}
                cards={text?.workflowCards}
            />
            <Products text={{ title: text?.productsTitle, tags: text?.productsTags, desc: text?.productsDesc }} />
            <Classes title={text?.classTitle} button={text?.viewButton}/>
            <Lectures text={{ title: text?.lectureTitle, tags: text?.lectureTags}} />
            <Moments text={{ title: text?.momentsTitle, tags: text?.momentsTags}} />
            <Testimony text={{ title: text?.testimonyTitle, tags: text?.testimonyTags}} />
            <Upcoming text={{title: text?.eventTitle, tags: text?.eventTags, button: text?.viewButton}} />
            <Faq text={{title: text?.faqTitle, tags: text?.faqTags}}/>
            <Supports text={{ title: text?.donateTitle, desc: text?.donateDesc, button: text?.donateButton}}/>
        </Mainlayouts>
    )
}

export default Homes