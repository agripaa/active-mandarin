import { Spin, Table } from "antd";
import { formatRupiah } from "../utils/rupiahFormat";
import { FaWhatsapp } from "react-icons/fa";
import { getTransactionById } from "../api/transaksi";
import { useEffect, useState } from "react";
import { formatDate } from "../utils/formatDate";
import { getProfile } from "../api/auth";
import { html2pdf } from "html2pdf.js";

const { useParams, Link, useNavigate } = require("react-router-dom");

const statusMap = {
  success: "text-green-500",
  pending: "text-yellow-500",
  cancel: "text-red-500",
};

const columns = [
  {
    title: "Product Info",
    dataIndex: "Brand",
    key: "Brand",
    render: (brand) => <a>{brand.variant}</a>,
  },
  {
    title: "Price",
    dataIndex: "Brand",
    key: "Brand",
    render: (p) =>
      p.discount_price ? formatRupiah(p.discount_price) : formatRupiah(p.price) || "-",
  },
  {
    title: "Affiliate Code",
    dataIndex: "Affiliator",
    key: "Affiliator",
    render: (a, record) => (record.Affiliator ? record.Affiliator.reveral_code : "-"),
  },
  {
    title: "Affiliate",
    dataIndex: "Affiliator",
    key: "Affiliator",
    render: (a, record) => (record.Affiliator ? record.Affiliator.name : "-"),
  },
  {
    title: "Status",
    dataIndex: "status_transaction",
    key: "status_transaction",
    render: (status) => (
      <p key={status} className={`font-medium capitalize ${statusMap[status]}`}>
        {status}
      </p>
    ),
  },
];

const Invoice = () => {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      if ([400, 401, 403].includes(error.status)) {
        navigate("/", { replace: true });
        return;
      }
    }
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById("invoice-content");

    import("html2pdf.js").then((module) => {
      const html2pdf = module.default;

      const opt = {
        margin: 0,
        filename: `Invoice-${formattedDate}-${invoiceData.Brand.category_brand}-${invoiceData.id}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      html2pdf().set(opt).from(element).save();
    });
  };

  const fetchInvoiceTransaction = async () => {
    try {
      const response = await getTransactionById(id);
      setInvoiceData(response.data);
    } catch (error) {
      if ([400, 401, 403].includes(error.status)) {
        navigate("/", { replace: true });
        return;
      }
    }
  };

  useEffect(() => {
    fetchInvoiceTransaction();
    fetchProfile();
  }, []);

  if (!invoiceData) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (!token) {
    navigate("/", { replace: true });
    return;
  }

  const date = new Date(invoiceData.transaction_date);
  const formattedDate = `${String(date.getDate()).padStart(2, "0")}${String(
    date.getMonth() + 1
  ).padStart(2, "0")}${date.getFullYear()}`;

  return (
    <>
      <div id="invoice-content" className="container w-full mx-auto max-w-[880px] my-8 px-5">
        <header className="flex justify-between items-center w-full">
          <img src="/assets/active_logo.png" alt="logo" className="h-16 w-auto" />
          <div className="flex flex-col items-end text-right">
            <h1 className="text-xl leading-[30px] font-semibold uppercase">Invoice</h1>
            <p className="text-sm text-[#3377FF] font-medium">{`INV/${formattedDate}/${invoiceData.Brand.category_brand}/${invoiceData.id}`}</p>
          </div>
        </header>
        <main className="w-full mt-12">
          <div className="flex flex-col justify-between items-start w-full lg:flex-row gap-12">
            <div className="w-full max-w-[366px]">
              <h2 className="uppercase font-semibold">Issued By</h2>
              <table className="table-auto border-collapse w-full mt-[7px]">
                <tbody>
                  <tr>
                    <td>Seller</td>
                    <td className="font-medium">: PT ACTIVE EDULANG GLOBAL</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full max-w-[405px]">
              <h2 className="font-semibold">Customer Details</h2>
              <table className="table-auto border-collapse w-full mt-[7px]">
                <tbody>
                  <tr>
                    <td>Buyer</td>
                    <td className="font-medium">: {invoiceData.User.name}</td>
                  </tr>
                  <tr>
                    <td>Purchase Date</td>
                    <td className="font-medium">: {formatDate(invoiceData.transaction_date)}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td className="font-medium">: {invoiceData.User.email}</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td className="font-medium">: {invoiceData.User.number || "-"}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td className="font-medium">: {invoiceData.User.address || "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-12 overflow-x-auto">
            <Table columns={columns} dataSource={[invoiceData]} pagination={false} />
          </div>
          <div className="w-full h-[1px] bg-fiord-300 mt-4" />
          <div className="flex mt-4 w-full justify-start md:justify-end">
            <div className="w-full max-w-[329px]">
              <h2>Transaction Details</h2>
              <table className="table-auto border-collapse w-full mt-4">
                <tbody>
                  <tr>
                    <td className="font-medium">Item Price</td>
                    <td className="font-medium text-right">{formatRupiah(invoiceData.Brand.price)}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Promo</td>
                    <td className="font-medium text-right">{invoiceData.Brand.discount_price ? formatRupiah(invoiceData.Brand.discount_price - invoiceData.Brand.price) : "Rp -0"}</td>
                  </tr>
                </tbody>
              </table>
              <table className="table-auto border-collapse w-full mt-4">
                <tbody>
                  <tr>
                    <td className="font-medium">Total Bill</td>
                    <td className="font-semibold text-right">{formatRupiah(invoiceData.Brand.discount_price)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <footer className="mt-12 container w-full mx-auto max-w-[880px] my-8 px-5">
        <div className="flex items-center justify-end mt-6 gap-2">
          <Link to="/dashboard">
            <button className="px-6 py-4 w-fit border-2 border-fiord-300 tracking-wide mt-2 text-xs text-fiord-950 font-medium rounded-2xl transition-all duration-300 hover:bg-yellow-500 hover:text-black sm:text-sm lg:text-base">
              Go To Dashboard
            </button>
          </Link>
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-4 w-fit bg-[#3377FF] tracking-wide text-xs mt-2 text-white font-medium rounded-2xl transition-all duration-300 hover:bg-blue-600 hover:text-white sm:text-sm lg:text-base"
          >
            Download Invoice
          </button>
          {user?.Role.role_name !== "admin" ? (
            <Link to="https://wa.me/+6282279506450" target="_blank">
              <button className="flex gap-4 items-center px-6 py-4 w-fit bg-[#57D163] tracking-wide mt-2 text-xs text-white font-medium rounded-2xl transition-all duration-300 hover:bg-[#47ac51] hover:text-black sm:text-sm lg:text-base">
                <FaWhatsapp size={20} />
                <span className="text-sm">Chat Mintive</span>
              </button>
            </Link>
          ) : null}
        </div>
      </footer>
    </>
  );
};

export default Invoice;
