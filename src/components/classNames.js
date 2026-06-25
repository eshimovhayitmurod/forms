import clsx from 'clsx';

// INPUT

export const inputContainerClass = () => {
   return clsx('w-full');
};
export const inputClass = ({ size = 'md', error = '' }) => {
   return clsx(
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
export const inputErrorClass = ({ size = 'md' }) => {
   return clsx('text-(--input-error-message-color) inline-block font-medium', {
      'text-[11px]': size === 'sm',
      'text-[12px]': !size || size === 'md',
      'text-[13px]': size === 'lg',
   });
};

// DROPDOWN

export const dropdownContainerClass = ({
   disabled = false,
   error = '',
   size = 'md',
}) => {
   return clsx(
      'group flex relative w-full border-2',

      'bg-(--color-input-bg-color)',
      'has-[:disabled]:bg-(--color-input-disabled-bg-color)',

      'border-(--color-input-border-color)',
      { 'border-(--color-input-border-error-color)': error && !disabled },
      { 'hover:border-(--color-input-border-focus-color)': !disabled },
      'focus-within:border-(--color-input-border-focus-color)',

      {
         'h-11 rounded-[10px]': !size || size === 'md',
         'h-12 rounded-[12px]': size === 'lg',
         'h-10 rounded-[9px]': size === 'sm',
      },
   );
};
export const dropdownInputClass = ({ size }) => {
   return clsx(
      'h-full border-none outline-none font-medium',

      'text-(--color-input-color)',
      'disabled:text-(--color-input-disabled-color)',
      'placeholder:text-(--color-input-placeholder-color)',

      'disabled:cursor-default disabled:truncate',

      {
         'w-[calc(100%-42px)] rounded-[10px] text-[16px] pl-3.75':
            !size || size === 'md',
         'w-[calc(100%-42px)] rounded-[12px] text-[18px] pl-4.5': size === 'lg',
         'w-[calc(100%-36px)] rounded-[9px] text-[16px] pl-3': size === 'sm',
      },
   );
};
export const dropdownTriggerClass = ({ size = 'md' }) => {
   return clsx(
      'h-full flex items-center justify-center rounded-[20px] select-none',
      {
         'w-11': size === 'md' || size === 'lg' || !size,
         'w-8': size === 'sm',
      },
   );
};
export const dropdownTriggerIconClass = ({ disabled = false, size = 'md' }) => {
   return clsx(
      'bg-transparent text-[#808080] rounded-full flex items-center justify-center outline-none border-none',
      { 'cursor-pointer hover:bg-[#f1f1f1] focus:bg-[#f1f1f1]': !disabled },
      {
         'h-8 w-8': size === 'md' || size === 'lg' || !size,
         'h-7 w-7': size === 'sm',
      },
   );
};
