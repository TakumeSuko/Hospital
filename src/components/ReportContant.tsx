'use client';

import { supabase } from '@/app/lib/supabase';
import { FormProps } from '@/src/utils/propType';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import {
  ClipboardDocumentCheckIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import InfoRow from './InfoRow';

interface ReportProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: FormProps;
}

export default function ReportContant({ open, setOpen, data }: ReportProps) {
  const router = useRouter();
  const handleSubmit = async () => {
    const { error } = await supabase.from('patients').insert([
      {
        first_name: data.firstName,
        middle_name: data.middleName,
        last_name: data.lastName,
        dateofbirth: data.dateofbirth,
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        address: data.address,
        language: data.language,
        nationality: data.nationality,
        emergency_name: data.emergencyName,
        emergency_relation: data.emergencyRelation,
        religion: data.religion,
      },
    ]);

    if (error) {
      alert('Error: ' + error.message);
      return;
    }

    alert('Submitted ✅');
    setOpen(false);
    router.push('/');
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className='relative z-50'
    >
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-blue-900/30 backdrop-blur-sm transition-opacity data-closed:opacity-0'
      />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>
          <DialogPanel
            transition
            className='relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all data-closed:scale-95 data-closed:opacity-0 sm:my-8 sm:w-full sm:max-w-lg'
          >
            <div className='bg-gradient-to-r from-blue-600 to-teal-500 px-6 py-4'>
              <div className='flex items-center space-x-3'>
                <div className='bg-white/20 p-2 rounded-lg'>
                  <ClipboardDocumentCheckIcon className='size-6 text-white' />
                </div>
                <DialogTitle as='h3' className='text-lg font-bold text-white'>
                  Patient Summary Report
                </DialogTitle>
              </div>
              <p className='mt-1 text-blue-50 text-xs italic'>
                Please verify the information before official registration.
              </p>
            </div>

            <div className='bg-white px-6 py-4 max-h-[60vh] overflow-y-auto'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-2 flex items-center space-x-2 text-blue-600 font-bold text-sm mb-1'>
                  <UserIcon className='size-4' />
                  <span>Personal Information</span>
                </div>
                <InfoRow
                  label='Full Name'
                  value={`${data.firstName} ${data.middleName} ${data.lastName}`}
                />
                <InfoRow label='Date of Birth' value={data.dateofbirth} />
                <InfoRow label='Gender' value={data.gender} />
                <InfoRow label='Nationality' value={data.nationality} />

                <div className='col-span-2 mt-4 flex items-center space-x-2 text-blue-600 font-bold text-sm mb-1'>
                  <PhoneIcon className='size-4' />
                  <span>Contact & Emergency</span>
                </div>
                <div className='col-span-2'>
                  <InfoRow label='Phone' value={data.phone} />
                </div>
                <InfoRow label='Emergency Contact' value={data.emergencyName} />
                <InfoRow label='Relationship' value={data.emergencyRelation} />

                <InfoRow label='Religion' value={data.religion} />
                <InfoRow label='Preferred Language' value={data.language} />

                <div className='col-span-2 mt-4'>
                  <InfoRow label='Full Address' value={data.address} />
                </div>
              </div>
            </div>

            {/* Footer: Actions */}
            <div className='bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse gap-2'>
              <button
                type='button'
                onClick={() => {
                  handleSubmit();
                }}
                className='inline-flex w-full justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all sm:w-auto'
              >
                Confirm Registration
              </button>
              <button
                type='button'
                onClick={() => setOpen(false)}
                className='mt-3 inline-flex w-full justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all sm:mt-0 sm:w-auto'
              >
                Go Back
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
