import React from "react";

const Buttons = ({ children }) => {
    const base = 'bg-[#FFCC00]'
    return(
        <button className={`px-8 py-4 text-[#252525] rounded-3xl font-regular ${base}`}>{children}</button>
    )
}

export default Buttons