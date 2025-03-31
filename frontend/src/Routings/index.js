import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homes from "../Pages/Home";
import About from "../Pages/About";
import Flashcard from "../Pages/Flashcard";
import Catalog from "../Pages/Catalog";
import Event from "../Pages/Event";
import Contact from "../Pages/Contact";
import Dashboard from "../Pages/Dashboard";
import DashboardProduct from "../Pages/DashboardProduct";
import DashboardProgram from "../Pages/DashboardProgram";
import Transaksi from "../Pages/Transaksi";
import Notifikasi from "../Pages/Notifikasi";
import Affiliate from "../Pages/Affiliate";
import Rekrutmen from "../Pages/Rekrutmen";
import Profile from "../Pages/Profile";
import CatalogProduct from "../Pages/CatalogProduct";
import DetailPage from "../Pages/DetailPage";
import Checkout from "../Pages/Checkout";
import Pembayaran from "../Pages/Pembayaran";
import Donation from "../Pages/Donation";

const Routings = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homes/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/flash" element={<Flashcard/>}/>
                <Route path="/class" element={<Catalog/>}/>
                <Route path="/products" element={<CatalogProduct/>}/>
                <Route path="/detail" element={<DetailPage/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/pembayaran" element={<Pembayaran/>}/>
                <Route path="/events" element={<Event/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/dashboard/products" element={<DashboardProduct/>}/>
                <Route path="/dashboard/programs" element={<DashboardProgram/>}/>
                <Route path="/transaksi" element={<Transaksi/>}/>
                <Route path="/notifikasi" element={<Notifikasi/>}/>
                <Route path="/affiliate" element={<Affiliate/>}/>
                <Route path="/rekrutmen" element={<Rekrutmen/>}/>
                <Route path="/donasi" element={<Donation/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routings