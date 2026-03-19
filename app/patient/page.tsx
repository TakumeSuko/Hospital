'use client';

import ReportContant from '@/src/components/ReportContant';
import { SectionTitle } from '@/src/components/SectionTitle';
import {
  ChevronLeftIcon,
  HeartIcon,
  IdentificationIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProps } from '../../src/utils/propType';
import { validate } from '../../src/utils/validate';

const Label = ({ text, required = false }: any) => (
  <label className='text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block'>
    {text}
    {required && <span className='text-red-500 ml-1'>*</span>}
  </label>
);

const formDefault = {
  firstName: '',
  middleName: '',
  lastName: '',
  dateofbirth: '',
  gender: '',
  phone: '',
  email: '',
  address: '',
  language: '',
  nationality: '',
  emergencyName: '',
  emergencyRelation: '',
  religion: '',
};

export default function PatientPage() {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const [form, setForm] = useState(formDefault);
  const [errors, setErrors] = useState<Partial<FormProps>>({});

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    let error = '';
    if (field === 'email' && value && !/\S+@\S+\.\S+/.test(value))
      error = 'Invalid email';
    if (field === 'phone' && value && !/^\d{10}$/.test(value))
      error = 'Phone must be 10 digits';
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setOpen(true);
  };

  const inputStyle =
    'w-full p-2.5 border border-slate-200 rounded-lg text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-slate-50/50 transition-all';
  return (
    <main className='min-h-screen bg-[#f8fafc] flex items-center justify-center p-6'>
      <div className='bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 rounded-3xl p-8 w-full max-w-3xl relative'>
        <button
          onClick={() => router.push('/')}
          className='absolute top-8 left-8 flex items-center text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium cursor-pointer'
        >
          <ChevronLeftIcon className='w-4 h-4 mr-1' />
          Back to Home
        </button>

        <div className='text-center mb-10'>
          <div className='bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4'>
            <HeartIcon className='w-8 h-8 text-blue-600' />
          </div>
          <h1 className='text-3xl font-extrabold text-slate-800 tracking-tight'>
            Patient Registration
          </h1>
          <p className='text-slate-500 mt-2 text-sm'>
            Please provide accurate medical information for our records.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-6 gap-x-4 gap-y-4'>
          <SectionTitle icon={UserIcon} title='Personal Information' />

          <div className='md:col-span-2'>
            <Label text='First Name' required />
            <input
              className={inputStyle}
              value={form.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
            {errors.firstName && (
              <p className='text-red-500 text-[12px] mt-1'>
                {errors.firstName}
              </p>
            )}
          </div>

          <div className='md:col-span-2'>
            <Label text='Middle Name' />
            <input
              className={inputStyle}
              value={form.middleName}
              onChange={(e) => handleChange('middleName', e.target.value)}
            />
          </div>

          <div className='md:col-span-2'>
            <Label text='Last Name' required />
            <input
              className={inputStyle}
              value={form.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
            {errors.lastName && (
              <p className='text-red-500 text-[12px] mt-1'>{errors.lastName}</p>
            )}
          </div>

          <div className='md:col-span-2'>
            <Label text='Date of Birth' required />
            <input
              type='date'
              className={inputStyle}
              value={form.dateofbirth}
              onChange={(e) => handleChange('dateofbirth', e.target.value)}
              onClick={(e) => e.currentTarget.showPicker()}
            />
            {errors.dateofbirth && (
              <p className='text-red-500 text-[12px] mt-1'>
                {errors.dateofbirth}
              </p>
            )}
          </div>

          <div className='md:col-span-2'>
            <Label text='Gender' required />
            <select
              className={inputStyle}
              value={form.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
            >
              <option value=''>Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && (
              <p className='text-red-500 text-[12px] mt-1'>{errors.gender}</p>
            )}
          </div>

          <div className='md:col-span-2'>
            <Label text='Nationality' required />
            <input
              className={inputStyle}
              value={form.nationality}
              onChange={(e) => handleChange('nationality', e.target.value)}
            />
            {errors.nationality && (
              <p className='text-red-500 text-[12px] mt-1'>
                {errors.nationality}
              </p>
            )}
          </div>

          <SectionTitle icon={PhoneIcon} title='Contact Details' />

          <div className='md:col-span-3'>
            <Label text='Phone number' required />
            <input
              className={inputStyle}
              placeholder='0XXXXXXXXX'
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
            {errors.phone && (
              <p className='text-red-500 text-[12px] mt-1'>{errors.phone}</p>
            )}
          </div>

          <div className='md:col-span-3'>
            <Label text='Email Address' required />
            <input
              className={inputStyle}
              placeholder='example@mail.com'
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && (
              <p className='text-red-500 text-[12px] mt-1'>{errors.email}</p>
            )}
          </div>

          <div className='md:col-span-6'>
            <Label text='Home Address' required />
            <textarea
              rows={2}
              className={`${inputStyle} resize-none`}
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
            {errors.address && (
              <p className='text-red-500 text-[12px] mt-1'>{errors.address}</p>
            )}
          </div>

          <SectionTitle icon={IdentificationIcon} title='Emergency & Others' />

          <div className='md:col-span-3'>
            <Label text='Emergency Contact Name' required />
            <input
              className={inputStyle}
              value={form.emergencyName}
              onChange={(e) => handleChange('emergencyName', e.target.value)}
            />
            {errors.emergencyName && (
              <p className='text-red-500 text-[12px] mt-1'>
                {errors.emergencyName}
              </p>
            )}
          </div>

          <div className='md:col-span-3'>
            <Label text='Relationship' />
            <input
              className={inputStyle}
              value={form.emergencyRelation}
              onChange={(e) =>
                handleChange('emergencyRelation', e.target.value)
              }
            />
          </div>

          <div className='md:col-span-3'>
            <Label text='Religion' />
            <input
              className={inputStyle}
              value={form.religion}
              onChange={(e) => handleChange('religion', e.target.value)}
            />
          </div>

          <div className='md:col-span-3'>
            <Label text='Preferred Language' />
            <input
              className={inputStyle}
              value={form.language}
              onChange={(e) => handleChange('language', e.target.value)}
            />
          </div>
        </div>

        <div className='mt-10 flex flex-col gap-3'>
          <button
            onClick={handleSubmit}
            className='w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer'
          >
            Review & Register
          </button>
          <p className='text-[11px] text-center text-slate-400'>
            By clicking register, you agree to our hospital data privacy policy.
          </p>
        </div>

        <ReportContant open={open} setOpen={setOpen} data={form} />
      </div>
    </main>
  );
}
