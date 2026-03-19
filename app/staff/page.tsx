'use client';

import {
  AcademicCapIcon,
  ChevronLeftIcon,
  ClockIcon,
  ExclamationCircleIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormDBProps } from '../../src/utils/propType';
import { supabase } from '../lib/supabase';

interface PatientDashboardProps extends FormDBProps {
  isNew?: boolean;
  id?: string;
}

export default function StaffPage() {
  const [patients, setPatients] = useState<PatientDashboardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false });
      setPatients((data as PatientDashboardProps[]) || []);
      setLoading(false);
    };

    fetchPatients();

    const channel = supabase
      .channel('patients-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'patients' },
        (payload) => {
          const newPatient = {
            ...payload.new,
            isNew: true,
          } as PatientDashboardProps;
          setPatients((prev) => [newPatient, ...prev]);
          setTimeout(() => {
            setPatients((prev) =>
              prev.map((p) =>
                p.id === payload.new.id ? { ...p, isNew: false } : p,
              ),
            );
          }, 5000);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  console.log('patients', patients);

  return (
    <main className='min-h-screen bg-[#f8fafc] p-8 pt-16 relative'>
      <div className='max-w-7xl mx-auto mb-6'>
        <button
          onClick={() => router.push('/')}
          className='flex items-center text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium group cursor-pointer'
        >
          <ChevronLeftIcon className='w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform' />
          Back to Home
        </button>
      </div>

      <div className='max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3'>
            <div className='bg-blue-600 p-2 rounded-lg'>
              <ClockIcon className='w-6 h-6 text-white' />
            </div>
            Staff Dashboard
          </h1>
          <p className='text-slate-500 mt-1 ml-11'>
            Real-time patient registration monitoring system.
          </p>
        </div>

        <div className='bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2 self-start md:self-center'>
          <span className='relative flex h-3 w-3'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
          </span>
          <span className='text-sm font-bold text-slate-600 uppercase tracking-wider'>
            Live Connection
          </span>
        </div>
      </div>

      {loading ? (
        <div className='max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className='bg-white rounded-[2rem] p-6 border border-slate-100 animate-pulse'
            >
              <div className='h-6 bg-slate-200 rounded-lg w-3/4 mb-4'></div>
              <div className='h-4 bg-slate-100 rounded w-1/2 mb-8'></div>
              <div className='space-y-4'>
                <div className='h-3 bg-slate-100 rounded w-full'></div>
                <div className='h-3 bg-slate-100 rounded w-full'></div>
                <div className='h-20 bg-slate-50 rounded-2xl w-full'></div>
              </div>
            </div>
          ))}
        </div>
      ) : patients.length > 0 ? (
        <div className='max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {patients.map((p) => (
            <div
              key={p.id}
              className={`group bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border transition-all duration-500 overflow-hidden ${
                p.isNew
                  ? 'border-blue-500 ring-2 ring-blue-100 scale-[1.02]'
                  : 'border-slate-100 hover:border-blue-200'
              }`}
            >
              {p.isNew && (
                <div className='bg-blue-500 text-white text-[12px] font-bold py-1 text-center uppercase tracking-widest'>
                  Newly Registered
                </div>
              )}

              <div className='p-6'>
                <div className='mb-4'>
                  <h2 className='text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors'>
                    {p.first_name} {p.last_name}
                  </h2>
                  <div className='flex items-center text-xs text-slate-400 mt-1'>
                    <span
                      className={` px-2 py-0.5 rounded mr-2 font-bold ${
                        p.gender === 'Male'
                          ? 'bg-blue-50 text-blue-600'
                          : p.gender === 'Female'
                            ? 'bg-pink-50 text-pink-600'
                            : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {p.gender}
                    </span>
                    <span>Birthday : {p.dateofbirth || 'N/A'}</span>
                  </div>
                </div>

                <div className='space-y-3 mt-6'>
                  <div className='flex items-start gap-3'>
                    <PhoneIcon className='w-4 h-4 text-slate-300 mt-0.5' />
                    <div className='flex flex-col'>
                      <span className='text-[10px] uppercase font-bold text-slate-400'>
                        Contact
                      </span>
                      <span className='text-sm text-slate-600'>{p.phone}</span>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <MapPinIcon className='w-4 h-4 text-slate-300 mt-0.5' />
                    <div className='flex flex-col'>
                      <span className='text-[10px] uppercase font-bold text-slate-400'>
                        Address
                      </span>
                      <span className='text-sm text-slate-600 line-clamp-1'>
                        {p.address}
                      </span>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <AcademicCapIcon className='w-4 h-4 text-slate-300 mt-0.5' />
                    <div className='flex flex-col'>
                      <span className='text-[10px] uppercase font-bold text-slate-400'>
                        Details
                      </span>
                      <span className='text-sm text-slate-600 '>
                        nationality : {p.nationality}
                      </span>
                      <span className='text-sm text-slate-600 '>
                        language : {p.language}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='mt-6 p-4 bg-red-50/50 rounded-2xl border border-red-100'>
                  <div className='flex items-center gap-2 mb-2'>
                    <ExclamationCircleIcon className='w-4 h-4 text-red-500' />
                    <span className='text-[10px] font-extrabold text-red-500 uppercase tracking-wider'>
                      Emergency Contact
                    </span>
                  </div>
                  <p className='text-sm font-bold text-slate-700'>
                    {p.emergency_name || '-'}
                  </p>
                  <p className='text-xs text-slate-500'>
                    {p.emergency_relation || '-'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='col-span-full text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200'>
          <p className='text-slate-400 font-medium'>
            No patient records found.
          </p>
        </div>
      )}
    </main>
  );
}
