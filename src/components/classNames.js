import clsx from 'clsx';
export const containerClass = () => {
   return clsx('w-full');
};
export const inputClass = ({ size = 'md', error = '', baseClass = '' }) => {
   return clsx(
      baseClass,
      'w-full font-medium outline-none border-2',
      'bg-(--input-bg-color) disabled:bg-(--input-disabled-bg-color)',
      'text-(--input-color) disabled:text-(--input-disabled-color)',
      'placeholder:text-(--input-placeholder-color)',
      'hover:not-disabled:border-(--input-border-focus-color)',
      'focus:not-disabled:border-(--input-border-focus-color)',
      'disabled:cursor-default disabled:overflow-hidden disabled:text-ellipsis disabled:whitespace-nowrap disabled:pointer-events-none',
      {
         'h-11 px-3.75 text-[16px] rounded-[10px]': !size || size === 'md',
         'h-12 px-4.5 text-[18px] rounded-[10px]': size === 'lg',
         'h-10 px-3 text-[15px] rounded-[9px]': size === 'sm',
         'border-(--input-border-error-color)': !!error,
         'border-(--input-border-color)': !error,
      },
   );
};
export const errorClass = ({ size = 'md' }) => {
   return clsx('text-(--input-error-message-color) inline-block font-medium', {
      'text-[11px]': size === 'sm',
      'text-[12px]': !size || size === 'md',
      'text-[13px]': size === 'lg',
   });
};
