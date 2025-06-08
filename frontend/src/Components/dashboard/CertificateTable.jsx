import { Spin, Table } from "antd";
import { formatRupiah } from "../../utils/rupiahFormat";
import { FaWhatsapp } from "react-icons/fa";
import { getTransactionById } from "../../api/transaksi";
import { getCertificateById } from "../../api/certificate";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { getProfile } from "../../api/auth";
import { html2pdf } from "html2pdf.js";
import PercentileRankData from "../../Store/Constants/PercentileRank";
import Swal from "sweetalert2";

const { useParams, Link, useNavigate } = require("react-router-dom");

const levelMap = {
  1: "HSK一级",
  2: "HSK二级",
  3: "HSK三级",
  4: "HSK四级",
  5: "HSK五级",
  6: "HSK六级",
};

const CertificateTable = () => {
  const { id, examNo } = useParams();
  const [certificate, setCertificate] = useState(null);
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

  const fetchCertificate = async () => {
    try {
      const response = await getCertificateById(id, examNo);
      setCertificate(response.data);
      console.log(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to fetch certificate",
      }).then(() => {
        navigate("/dashboard", { replace: true });
      });
      if ([400, 401, 403].includes(error.status)) {
        navigate("/", { replace: true });
        return;
      }
    }
  };


  useEffect(() => {
    fetchCertificate();
    fetchProfile();
  }, []);

  if (!certificate) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="p-[9px] rounded-[3px]">
        <center>
          <h2 className="text-xl lg:text-3xl mt-5 mb-2.5">
            中文考试成绩在线验证结果查询
          </h2>
          <h4 className="text-base lg:text-lg my-2.5">
            汉考国际教育科技（北京）有限公司（CTI）
          </h4>
        </center>
        <div className="mb-5 bg-white border border-[#ddd] rounded-[4px] shadow-sm">
          <div className="p-6 rounded-md">
            <div className="mb-5 bg-white border border-[#ddd] rounded-[4px] shadow-sm">
              <div className="p-[15px] text-sm">Information of test taker</div>
              <table className="border-t border-[#ddd] rounded-b-[3px] w-full bg-transparent p-0">
                <tbody className="p-0">
                  <tr>
                    <td className="border border-[#ddd] bg-[#f5f5f5] p-2 text-right align-top leading-[1.42857143] border-x-0">
                      Name on Certificate
                    </td>
                    <td
                      colspan="2"
                      className="border border-[#ddd] p-2 text-left align-top leading-[1.42857143] border-r-0"
                    >
                      {certificate?.User?.name}
                    </td>
                    <td
                      rowspan="5"
                      width={150}
                      className="border-l border-b border-[#ddd] p-0 w-[150px]"
                    >
                      <img
                        src={
                          certificate?.User?.profile_img ? `${process.env.REACT_APP_API_IMG}${certificate?.User?.profile_img}` : "/assets/profile-dummy.webp"
                        }
                        className="p-2 h-auto"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#ddd] bg-[#f5f5f5] p-2 text-right align-top leading-[1.42857143] border-x-0">
                      Nationality
                    </td>
                    <td className="border border-[#ddd] p-2 text-left align-top leading-[1.42857143] border-r-0">
                      {certificate?.nationality}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#ddd] bg-[#f5f5f5] p-2 text-right align-top leading-[1.42857143] border-x-0">
                      Gender
                    </td>
                    <td className="border border-[#ddd] p-2 text-left align-top leading-[1.42857143] border-r-0">
                      {certificate?.gender === "Male" ? "男" : "女"}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colspan="2"
                      className="border border-[#ddd] p-2 text-left align-top leading-[1.42857143] border-x-0"
                    >
                      考试信息
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#ddd] bg-[#f5f5f5] p-2 text-right align-top leading-[1.42857143] border-x-0">
                      证书编号
                    </td>
                    <td
                      colspan="2"
                      className="border border-[#ddd] p-2 text-left align-top leading-[1.42857143] border-r-0"
                    >
                      {certificate?.exam_no}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#ddd] bg-[#f5f5f5] p-2 text-right align-top leading-[1.42857143] border-x-0 border-b-0">
                      Test Type
                    </td>
                    <td
                      colspan="2"
                      className="border border-[#ddd] p-2 text-left align-top leading-[1.42857143] border-r-0 border-b-0"
                    >
                      {levelMap[certificate?.exam_level]}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-5 bg-white border border-[#ddd] rounded-[4px] shadow-sm">
              <div className="p-[15px] text-sm">
                {levelMap[certificate?.exam_level]}中文水平考试
              </div>
              <table className="border-t border-[#ddd] rounded-b-[3px] w-full bg-transparent">
                <thead>
                  <tr className="bg-[#f5f5f5]">
                    <th className="border border-[#ddd] p-2 text-center align-top leading-[1.42857143] border-b border-x-0">
                      <div align="center">听力</div>
                    </th>

                    <th className="border border-[#ddd] p-2 text-center align-top leading-[1.42857143] border-b border-r-0">
                      <div align="center">阅读</div>
                    </th>

                    <th className="border border-[#ddd] p-2 text-center align-top leading-[1.42857143] border-b border-r-0">
                      <div align="center">写作</div>
                    </th>

                    <th className="border border-[#ddd] p-2 text-center align-top leading-[1.42857143] border-b border-r-0">
                      <div align="center">Total Score</div>
                    </th>

                    <th className="border border-[#ddd] p-2 text-center align-top leading-[1.42857143] border-b border-r-0">
                      <div align="center">Status</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      align="center"
                      className="border border-[#ddd] p-2 text-center align-top leading-[1.42857143] border-b-0 border-x-0"
                    >
                      {certificate?.listening_score}
                    </td>

                    <td
                      align="center"
                      className="border border-[#ddd] p-2 text-center align-top leading-[1.42857143] border-b-0 border-r-0"
                    >
                      {certificate?.reading_score}
                    </td>

                    <td
                      align="center"
                      className="border border-[#ddd] p-2 text-center align-top leading-[1.42857143] border-b-0 border-r-0"
                    >
                      {certificate?.writing_score || "-"}
                    </td>

                    <td
                      align="center"
                      className="border border-[#ddd] p-2 text-center align-top leading-[1.42857143] border-b-0 border-r-0"
                    >
                      {certificate?.total_score}
                    </td>

                    <td
                      align="center"
                      className="border border-[#ddd] p-2 text-center align-top leading-[1.42857143] border-b-0 border-r-0"
                    >
                      合格
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <center>
              <h6>最终解释权归汉考国际所有</h6>
            </center>
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificateTable;
