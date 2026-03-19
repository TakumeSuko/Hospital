export const SectionTitle = ({
  icon: Icon,
  title,
}: {
  icon: any;
  title: string;
}) => (
  <div className='flex items-center gap-2 border-b border-slate-100 pb-2 mb-4 mt-6 col-span-full'>
    <Icon className='w-5 h-5 text-blue-600' />
    <h2 className='text-sm font-bold text-slate-700 uppercase tracking-wide'>
      {title}
    </h2>
  </div>
);
