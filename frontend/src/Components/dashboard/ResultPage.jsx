import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { RiArrowLeftLine } from "react-icons/ri";
import { getUjianReviewResult } from '../../api/ujian';

const ResultPage = () => {
  const { ujian_id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await getUjianReviewResult(ujian_id);
        if (res.status) {
          setData(res.data);
        }
      } catch (err) {
        console.error("❌ Error fetching ujian review result:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [ujian_id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center">Loading...</div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center text-red-500">Gagal memuat data.</div>
      </DashboardLayout>
    );
  }

  const { total, per_phase } = data;

  return (
    <DashboardLayout>
      <div className='p-6'>
        <button
          onClick={() => navigate(-1)}
          className="text-md font-normal flex items-center justify-center text-blue-500 mb-4 gap-2"
        >
          <RiArrowLeftLine size={20}/> Kembali
        </button>

        <div className="flex flex-col md:flex-row w-full items-center justify-center gap-24 min-h-[80vh]">
          <img src="/assets/congrats.png" alt="congrats img" className='w-9/12 md:w-5/12'  />

          <div className='bg-white p-5 rounded-lg max-w-lg w-full'>
            <h4 className='font-normal text-neutral-500 text-lg'>Total Score</h4>
            <div className='flex my-2 mb-10 items-end'>
              <h2 className='font-semibold text-gray-800 text-6xl'>{total.point}</h2>
              <h4 className='font-semibold text-blue-500 text-3xl'>/{total.max}</h4>
            </div>

            <h4 className='font-normal text-neutral-500 text-lg'>Detail Score</h4>
            <div className='flex flex-col w-full'>
                {["listening", "reading", "writing"].map((phase) =>
                data.per_phase[phase]?.available ? (
                    <span key={phase} className='text-neutral-800 w-full flex text-xl my-2 justify-between items-center font-medium'>
                    <h4>{phase.charAt(0).toUpperCase() + phase.slice(1)} Score</h4>
                    <h4>{data.per_phase[phase].point}/{data.per_phase[phase].max}</h4>
                    </span>
                ) : null
                )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResultPage;
