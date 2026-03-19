export default function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className='flex flex-col border-b border-gray-100 py-2'>
      <span className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>
        {label}
      </span>
      <span className='text-sm text-gray-700'>{value || '-'}</span>
    </div>
  );
}
