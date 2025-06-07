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
import JoinAffiliate from "../Pages/JoinAffiliate";
import Reqruitment from "../Pages/Reqruitment";
import GiveDonation from "../Pages/GiveDonation";
import Invoice from "../Pages/Invoice";
import KelasAffiliator from "../Pages/KelasAffiliator";
import BecomePartner from "../Pages/BecomePartner";
import DashboardExam from "../Pages/DashboardExam";
import CreateExam from "../Components/dashboard/CreateExam";
import NotifikasiAffiliator from "../Pages/NotifikasiAffiliator";
import NotifikasiTransaksi from "../Pages/NotifikasiTransaksi";
import NotifikasiUjian from "../Pages/NotifikasiUjian";
import DashboardExaminate from "../Pages/DashboardExaminate";
import TakeExam from "../Pages/TakeExam";
import ExamList from "../Components/dashboard/ExamList";
import ResultExams from "../Components/dashboard/ResultExams";
import ResultPage from "../Components/dashboard/ResultPage";
import Certificate from "../Components/dashboard/Certificate";
import CertificateTable from "../Components/dashboard/CertificateTable";

const Routings = () => {
    return(
        <BrowserRouter>
            <Routes>
                {/* Landing Page */}
                <Route path="/" element={<Homes/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/flash" element={<Flashcard/>}/>
                <Route path="/class" element={<Catalog/>}/>
                <Route path="/products" element={<CatalogProduct/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/join-affiliate" element={<JoinAffiliate/>}/>
                <Route path="/join-team" element={<Reqruitment/>}/>
                <Route path="/donate" element={<GiveDonation/>}/>
                <Route path="/become-partner" element={<BecomePartner/>}/>
                <Route path="/kelas-affiliator" element={<KelasAffiliator/>}/>

                {/* Transaction User Page */}
                <Route path="/detail/:id" element={<DetailPage/>}/>
                <Route path="/checkout/:id" element={<Checkout/>}/>
                <Route path="/pembayaran/:id" element={<Pembayaran/>}/>
                <Route path="/invoice/:id" element={<Invoice/>}/>

                {/* Dashboard */}
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/dashboard/products" element={<DashboardProduct/>}/>
                <Route path="/dashboard/programs" element={<DashboardProgram/>}/>
                <Route path="/dashboard/exam" element={<DashboardExam/>}/>
                <Route path="/transaksi" element={<Transaksi/>}/>
                <Route path="/verifikasi/affiliator" element={<NotifikasiAffiliator/>}/>
                <Route path="/verifikasi/transaksi" element={<NotifikasiTransaksi/>}/>
                <Route path="/verifikasi/ujian" element={<NotifikasiUjian/>}/>
                <Route path="/dashboard/examinate/:id" element={<DashboardExaminate/>}/>
                <Route path="/dashboard/take-exam/:id" element={<TakeExam/>}/>
                <Route path="/affiliate" element={<Affiliate/>}/>
                <Route path="/rekrutmen" element={<Rekrutmen/>}/>
                <Route path="/donasi" element={<Donation/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/dashboard/exam/add" element={<CreateExam/>}/>
                <Route path="/exams" element={<ExamList/>}/>
                <Route path="/result-exam" element={<ResultExams/>}/>
                <Route path="/result-exam/:id" element={<ResultPage/>}/>
                <Route path="/certificate/:id" element={<Certificate/>}/>
                <Route path="/certificate-table/:id" element={<CertificateTable/>}/>

                {/* IDK */}
                <Route path="/events" element={<Event/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routings