import React from "react";

const Buttons = ({ children }) => {
    const base = 'bg-[#6699FF]'
    return(
        <button className={`px-8 py-4 text-white rounded-full font-regular ${base}`}>{children}</button>
    )
}

export default Buttons