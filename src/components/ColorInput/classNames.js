import clsx from 'clsx';
export const containerClass = () => {
   return clsx('group flex h-11 relative w-full');
};
export const inputClass = () => {
   return clsx(
      'w-full h-11 border-2 rounded-[10px] pl-3.75 pr-11.25 outline-none text-[16px] font-medium',
      'bg-(--color-input-bg-color)',
      'disabled:bg-(--color-input-disabled-bg-color)',

      'text-(--color-input-color)',
      'disabled:text-(--color-input-disabled-color)',

      'placeholder:text-(--color-input-placeholder-color)',

      'border-(--color-input-border-color)',
      'hover:border-(--color-input-border-focus-color)',
      'focus:border-(--color-input-border-focus-color)',
      'data-[error=true]:border-(--color-input-border-error-color)',

      'disabled:cursor-default',
      'disabled:truncate',

      'data-[size=lg]:h-14',
      'data-[size=lg]:text-[18px]',
      'data-[size=lg]:pl-[18px]',
      'data-[size=lg]:pr-[18px]',
      'data-[size=lg]:rounded-[12px]',

      'data-[size=sm]:h-10',
      'data-[size=sm]:text-[15px]',
      'data-[size=sm]:pl-[12px]',
      'data-[size=sm]:pr-[12px]',
   );
};
export const triggerClass = () => {
   return clsx(
      'absolute right-1.25 top-1.25 flex h-9 w-9 items-center justify-center rounded-[20px] cursor-pointer select-none',
      'bg-transparent',
      'text-[#808080]',
      'data-[size=lg]:right-2 data-[size=lg]:top-2 data-[size=lg]:w-10 data-[size=lg]:h-10 data-[size=sm]:right-1 data-[size=sm]:top-1 data-[size=sm]:w-8 data-[size=sm]:h-8',
   );
};
export const triggerIconClass = () => {
   return clsx(
      'border-2 w-5 h-5 rounded-lg',
      'border-(--color-input-trigger-border-color) group-focus-within:border-(--color-input-trigger-border-focus-color)',
   );
};
export const menuClass = () => {
   return clsx(
      'rounded-[14px] p-3',
      'bg-(--color-input-menu-bg-color) shadow-[0_1px_20px_0_rgba(13,46,105,0.07),0_1px_20px_0_rgba(13,46,105,0.07)]',
   );
};
