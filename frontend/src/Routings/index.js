import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homes from "../Pages/Home";
import About from "../Pages/About";
import Flashcard from "../Pages/Flashcard";
import Catalog from "../Pages/Catalog";
import Event from "../Pages/Event";
import Contact from "../Pages/Contact";

const Routings = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homes/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/flash" element={<Flashcard/>}/>
                <Route path="/class" element={<Catalog/>}/>
                <Route path="/events" element={<Event/>}/>
                <Route path="/contact" element={<Contact/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routings