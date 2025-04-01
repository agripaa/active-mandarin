import { Table } from "antd";
import { formatRupiah } from "../utils/rupiahFormat";
import { FaWhatsapp } from "react-icons/fa";

const { useParams, Link } = require("react-router-dom")

const statusMap = {
  success: "text-green-500",
  pending: "text-yellow-500",
  failed: "text-red-500",
}

const columns = [
  {
    title: 'Info Produk',
    dataIndex: 'product_info',
    key: 'product_info',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Harga',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Kode Affiliate',
    dataIndex: 'affiliate_code',
    key: 'affiliate_code',
  },
  {
    title: 'Affiliate',
    dataIndex: 'affiliate',
    key: 'affiliate',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_, { status }) => (
      <p key={status} className={`font-medium capitalize ${statusMap[status]}`}>
        {status}
      </p>
    ),
  },
];

const data = [
  {
    key: '1',
    product_info: 'Active Edulang Global - Program 1',
    price: 'Rp 1.000.000',
    affiliate_code: '123456',
    affiliate: 'Dicka Taksa',
    status: 'success',
  },
  {
    key: '2',
    product_info: 'Active Edulang Global - Program 2',
    price: 'Rp 2.500.000',
    affiliate_code: '654321',
    affiliate: 'John Doe',
    status: 'pending',
  },
  {
    key: '3',
    product_info: 'Active Edulang Global - Program 3',
    price: 'Rp 750.000',
    affiliate_code: '789012',
    affiliate: 'Jane Smith',
    status: 'failed',
  },
  {
    key: '4',
    product_info: 'Active Edulang Global - Program 4',
    price: 'Rp 3.000.000',
    affiliate_code: '345678',
    affiliate: 'Alice Johnson',
    status: 'success',
  },
  {
    key: '5',
    product_info: 'Active Edulang Global - Program 5',
    price: 'Rp 1.500.000',
    affiliate_code: '987654',
    affiliate: 'Bob Brown',
    status: 'pending',
  },
];

const Invoice = () => {
  const { id } = useParams();

  return (
    <div className="container w-full mx-auto max-w-[880px] my-8 px-5">
      <header className="flex justify-between items-center w-full">
        <img src="/assets/active_logo.png" alt="logo" className="h-16 w-auto" />
        <div className="flex flex-col items-end text-right">
          <h1 className="text-xl leading-[30px] font-semibold uppercase">Invoice</h1>
          <p className="text-sm text-[#3377FF] font-medium">INV/01042025/Program/23456</p>
        </div>
      </header>
      <main className="w-full mt-12">
        <div className="flex flex-col justify-between items-start w-full lg:flex-row gap-12">
          <div className="w-full max-w-[366px]">
            <h2 className="uppercase font-semibold">Diterbitkan Atas Nama</h2>
            <table className="table-auto border-collapse w-full mt-[7px]">
              <tbody>
                <tr>
                  <td className="">Penjual</td>
                  <td className="font-medium">: PT ACTIVE EDULANG GLOBAL</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full max-w-[405px]">
            <h2 className="font-semibold">Untuk</h2>
            <table className="table-auto border-collapse w-full mt-[7px]">
              <tbody>
                <tr className="my-[7px]">
                  <td className="">Pembeli</td>
                  <td className="font-medium">: Dicka Taksa</td>
                </tr>
                <tr className="my-[7px]">
                  <td className="">Tanggal Pembelian</td>
                  <td className="font-medium">: 1 April 2025</td>
                </tr>
                <tr className="my-[7px]">
                  <td className="">Email</td>
                  <td className="font-medium">: dicka.taksa123@gmail.com</td>
                </tr>
                <tr className="my-[7px]">
                  <td className="">No Telepon</td>
                  <td className="font-medium">: 081388876690</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-12 overflow-x-auto">
          <Table columns={columns} dataSource={data} pagination={false} className="w-full min-w-[500px]" />
        </div>
        <div className="w-full h-[1px] bg-fiord-300 mt-4" />
        <div className="flex mt-4 w-full justify-start md:justify-end">
          <div className="w-full max-w-[329px]">
            <h2>Detail Transaksi</h2>
            <table className="table-auto border-collapse w-full mt-4">
              <tbody>
                <tr className="my-[7px]">
                  <td className="font-medium">Harga Item</td>
                  <td className="font-medium text-right">{formatRupiah(50000)}</td>
                </tr>
                <tr className="my-[7px]">
                  <td className="font-medium">Promo</td>
                  <td className="font-medium text-right">-</td>
                </tr>
              </tbody>
            </table>
            <table className="table-auto border-collapse w-full mt-4">
              <tbody>
                <tr>
                  <td className="font-medium">Total Tagihan</td>
                  <td className="font-semibold text-right">{formatRupiah(50000)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <footer className="mt-12">
        <div className='flex items-center justify-end mt-6 gap-4'>
          <Link to='/dashboard'>
            <button
              className="px-6 py-4 w-fit border-2 border-fiord-300 tracking-wide mt-2 text-xs text-fiord-950 font-medium rounded-2xl transition-all duration-300 hover:bg-yellow-500 hover:text-black sm:text-sm lg:text-base"
            >
              Go To Dashboard
            </button>
          </Link>
          <Link to='/class'>
            <button
              className="flex gap-4 items-center px-6 py-4 w-fit bg-[#57D163] tracking-wide mt-2 text-xs text-white font-medium rounded-2xl transition-all duration-300 hover:bg-[#47ac51] hover:text-black sm:text-sm lg:text-base"
            >
              <FaWhatsapp size={20} />
              <span className="text-sm">Chat Mintive</span>
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Invoice;