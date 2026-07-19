import clsx from 'clsx';

// CONTAINER

export const containerClass = ({ containerClassName = '' }) => {
   return clsx(containerClassName);
};

// ERROR

export const errorClass = ({ size = 'md', errorClassName = '' }) => {
   return clsx(
      'text-(--input-error-message-color) inline-block font-medium',
      {
         'text-[11px]': size === 'sm',
         'text-[12px]': !size || size === 'md',
         'text-[13px]': size === 'lg',
      },
      errorClassName,
   );
};

// INPUT

export const inputContainerClass = ({
   disabled = false,
   error = false,
   inputContainerClassName = '',
   size = 'md',
}) => {
   return clsx(
      'w-full border-2',

      'bg-(--color-input-bg-color)',
      'has-[:disabled]:bg-(--color-input-disabled-bg-color)',

      'border-(--color-input-border-color)',
      { 'border-(--color-input-border-error-color)': error && !disabled },
      {
         'hover:border-(--color-input-border-focus-color)': !disabled && !error,
         'focus-within:border-(--color-input-border-focus-color)':
            !disabled && !error,
      },

      {
         'h-11 rounded-[10px]': !size || size === 'md',
         'h-12 rounded-[12px]': size === 'lg',
         'h-10 rounded-[9px]': size === 'sm',
      },
      inputContainerClassName,
   );
};
export const inputClass = ({ inputClassName = '', size = 'md' }) => {
   return clsx(
      'w-full h-full disabled:cursor-default border-none outline-none focus:outline-none font-medium',

      'bg-transparent',

      'text-(--input-color)',
      'disabled:text-(--input-disabled-color)',

      'placeholder:text-(--input-placeholder-color)',

      {
         'px-3.75 text-[16px] rounded-[10px]': !size || size === 'md',
         'px-4.5 text-[18px] rounded-[10px]': size === 'lg',
         'px-3 text-[15px] rounded-[9px]': size === 'sm',
      },
      inputClassName,
   );
};

// TEXTAREA
export const textareaContainerClass = ({
   disabled = false,
   error = false,
   size = 'md',
   textareaContainerClassName = '',
}) => {
   return clsx(
      'w-full border-2',

      'bg-(--color-input-bg-color)',
      'has-[:disabled]:bg-(--color-input-disabled-bg-color)',

      'border-(--color-input-border-color)',
      { 'border-(--color-input-border-error-color)': error && !disabled },
      {
         'hover:border-(--color-input-border-focus-color)': !disabled && !error,
         'focus-within:border-(--color-input-border-focus-color)':
            !disabled && !error,
      },

      {
         'rounded-[10px]': !size || size === 'md',
         'rounded-[12px]': size === 'lg',
         'rounded-[9px]': size === 'sm',
      },
      textareaContainerClassName,
   );
};
export const textareaClass = ({
   maxHeight = 350,
   minHeight = 95,
   size = 'md',
   textareaClassName = '',
}) => {
   return clsx(
      'w-full disabled:cursor-default border-none outline-none focus:outline-none font-medium block box-border field-sizing-content resize-none py-[10px] pr-[10px] pl-[17px]',

      'bg-transparent',

      'text-(--input-color)',
      'disabled:text-(--input-disabled-color)',

      'placeholder:text-(--input-placeholder-color)',

      `min-h-[${minHeight}px] max-h-[${maxHeight}px]`,
      {
         'text-[16px] rounded-[10px]': !size || size === 'md',
         'text-[18px] rounded-[10px]': size === 'lg',
         'text-[15px] rounded-[9px]': size === 'sm',
      },
      textareaClassName,
   );
};

// DROPDOWN

export const dropdownContainerClass = ({
   disabled = false,
   dropdownContainerClassName = '',
   error = false,
   size = 'md',
}) => {
   return clsx(
      'flex w-full border-2',

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
      dropdownContainerClassName,
   );
};
export const dropdownInputClass = ({
   dropdownInputClassName = '',
   size = 'md',
}) => {
   return clsx(
      'h-full border-none outline-none font-medium',

      'bg-transparent',

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
      dropdownInputClassName,
   );
};
export const dropdownTriggerClass = ({
   dropdownTriggerClassName = '',
   size = 'md',
}) => {
   return clsx(
      'h-full flex items-center justify-center rounded-[20px] select-none',
      {
         'w-11': size === 'md' || size === 'lg' || !size,
         'w-8': size === 'sm',
      },
      dropdownTriggerClassName,
   );
};
export const dropdownTriggerIconClass = ({
   disabled = false,
   dropdownTriggerIconClassName = '',
   size = 'md',
}) => {
   return clsx(
      'bg-transparent text-[#808080] rounded-full flex items-center justify-center outline-none border-none',
      { 'cursor-pointer hover:bg-[#f1f1f1] focus:bg-[#f1f1f1]': !disabled },
      {
         'h-8 w-8': size === 'md' || size === 'lg' || !size,
         'h-7 w-7': size === 'sm',
      },
      dropdownTriggerIconClassName,
   );
};

// OTP INPUT

export const otpInputClass = ({
   disabled = false,
   error = false,
   size = 'md',
}) => {
   return clsx(
      'rounded-[10px] border-2 border-solid text-[18px] font-semibold outline-none m-0 p-0',

      'bg-(--input-bg-color) disabled:bg-(--input-disabled-bg-color)',

      'text-(--input-color) disabled:text-(--input-disabled-color)',

      'border-(--color-input-border-color)',
      { 'border-(--color-input-border-error-color)': error && !disabled },
      { 'hover:border-(--color-input-border-focus-color)': !disabled },
      'focus:border-(--color-input-border-focus-color)',
      {
         'h-12 w-10!': !size || size === 'md',
         'h-11 w-9!': size === 'sm',
         'h-13 w-11!': size === 'lg',
      },
   );
};
