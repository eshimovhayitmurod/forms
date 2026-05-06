import clsx from 'clsx';
export const containerClass = () => {
   return clsx('w-full');
};
export const inputClass = ({ size = 'md', error = '', baseClass = '' }) => {
   return clsx(
      baseClass,
      'w-full font-medium outline-none border-2',
      'bg-[#ffffff] text-[#000000]',
      'placeholder:text-[#717171]',
      'hover:not-disabled:border-[#3a79f3]',
      'focus:not-disabled:border-[#3a79f3]',
      'disabled:bg-[#f4f4f4]',
      'disabled:cursor-default disabled:overflow-hidden disabled:text-ellipsis disabled:whitespace-nowrap disabled:pointer-events-none',
      'disabled:text-[#717171]',
      {
         'h-11 px-3.75 text-[16px] rounded-[10px]': !size || size === 'md',
         'h-12 px-4.5 text-[18px] rounded-[10px]': size === 'lg',
         'h-10 px-3 text-[15px] rounded-[9px]': size === 'sm',
         'border-[#e41d32]': !!error,
         'border-[#e1e1e1]': !error,
      },
   );
};
export const errorClass = ({ size = 'md' }) => {
   return clsx('text-[#e41d32] inline-block font-medium', {
      'text-[11px]': size === 'sm',
      'text-[12px]': !size || size === 'md',
      'text-[13px]': size === 'lg',
   });
};
