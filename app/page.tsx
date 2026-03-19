'use client';

import {
  ClipboardDocumentListIcon,
  HeartIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex items-center justify-center min-h-screen bg-[#f8fafc] p-6'>
      <div className='bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 rounded-[2.5rem] p-10 text-center w-full max-w-md relative overflow-hidden'>
        <div className='absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl' />
        <div className='absolute -bottom-10 -left-10 w-32 h-32 bg-teal-50 rounded-full blur-3xl' />

        <div className='relative mb-8'>
          <div className='bg-gradient-to-br from-blue-600 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-100'>
            <HeartIcon className='w-9 h-9 text-white' />
          </div>
          <h1 className='text-2xl font-black text-slate-800 tracking-tight'>
            CareStream <span className='text-blue-600'>Portal</span>
          </h1>
          <p className='text-slate-400 text-sm mt-1 uppercase font-bold tracking-[0.2em]'>
            Hospital Management
          </p>
        </div>

        <div className='flex flex-col gap-4 relative'>
          <Link href='/patient' className='group'>
            <div className='w-full p-4 rounded-2xl bg-white border-2 border-slate-50 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 flex items-center gap-4 text-left group-active:scale-95'>
              <div className='bg-blue-50 p-3 rounded-xl group-hover:bg-blue-600 transition-colors'>
                <UserPlusIcon className='w-6 h-6 text-blue-600 group-hover:text-white' />
              </div>
              <div>
                <h2 className='font-bold text-slate-700'>New Patient</h2>
                <p className='text-xs text-slate-400'>Register a new record</p>
              </div>
            </div>
          </Link>

          <Link href='/staff' className='group'>
            <div className='w-full p-4 rounded-2xl bg-white border-2 border-slate-50 hover:border-teal-500 hover:shadow-xl hover:shadow-teal-50 transition-all duration-300 flex items-center gap-4 text-left group-active:scale-95'>
              <div className='bg-teal-50 p-3 rounded-xl group-hover:bg-teal-600 transition-colors'>
                <ClipboardDocumentListIcon className='w-6 h-6 text-teal-600 group-hover:text-white' />
              </div>
              <div>
                <h2 className='font-bold text-slate-700'>Staff Dashboard</h2>
                <p className='text-xs text-slate-400'>Monitor real-time data</p>
              </div>
            </div>
          </Link>
        </div>

        <p className='mt-10 text-[11px] text-slate-400 font-medium'>
          © 2026 CareStream Medical Group. All rights reserved.
        </p>
      </div>
    </main>
  );
}
