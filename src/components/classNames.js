import clsx from 'clsx';
// CONTAINER
export const containerClass = () => clsx('');
// ERROR
export const errorClass = ({ size = 'md' }) => {
   return clsx('text-(--input-error-message-color) inline-block font-medium', {
      'text-[11px]': size === 'sm',
      'text-[12px]': !size || size === 'md',
      'text-[13px]': size === 'lg',
   });
};
// CLEAR BUTTON
export const clearButtonClass = () => {
   return clsx(
      'cursor-pointer outline-none items-center rounded-xl flex h-6 justify-center w-6',

      'hover:bg-(--input-suffix-hover-and-focus-bg) focus:bg-(--input-suffix-hover-and-focus-bg)',

      'text-(--input-suffix-color)',
   );
};
// INPUT
export const inputContainerClass = ({
   disabled = false,
   error = false,
   size = 'md',
}) => {
   return clsx(
      'w-full flex border-2',

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
   );
};
export const inputClass = ({
   clearable = false,
   disabled = false,
   loading = false,
   size = 'md',
}) => {
   const hasAppendIcon = loading || (clearable && !disabled);
   const width = !hasAppendIcon
      ? 'w-full'
      : size === 'sm'
        ? 'w-[calc(100%-38px)]'
        : size === 'lg'
          ? 'w-[calc(100%-42px)]'
          : 'w-[calc(100%-40px)]';
   const paddingRight = hasAppendIcon
      ? 'pl-0'
      : !size || size === 'md'
        ? 'pr-3.75'
        : size === 'lg'
          ? 'pr-4.5'
          : 'pr-3';
   const inputClass = clsx(
      'h-full disabled:cursor-default border-none outline-none focus:outline-none font-medium',

      'bg-transparent',

      'text-(--input-color)',
      'disabled:text-(--input-disabled-color)',

      'placeholder:text-(--input-placeholder-color)',

      width,
      paddingRight,

      {
         'pl-3.25 text-[16px] rounded-[10px]': !size || size === 'md',
         'pl-3.75 text-[17px] rounded-[10px]': size === 'lg',
         'pl-3 text-[15px] rounded-[9px]': size === 'sm',
      },
   );
   return inputClass;
};
export const inputSuffixClass = ({ size = 'md' }) => {
   const width = size === 'sm' ? 'w-9.5' : size === 'lg' ? 'w-10.5' : 'w-10';
   return clsx(
      'h-full flex items-center justify-center rounded-[20px] select-none',
      width,
   );
};
// TEXTAREA
export const textareaContainerClass = ({
   disabled = false,
   error = false,
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
         'rounded-[10px]': !size || size === 'md',
         'rounded-[12px]': size === 'lg',
         'rounded-[9px]': size === 'sm',
      },
   );
};
export const textareaClass = ({ size = 'md' }) => {
   return clsx(
      'w-full disabled:cursor-default border-none outline-none focus:outline-none font-medium block box-border field-sizing-content resize-none py-[10px] pr-[10px] pl-[17px]',

      'bg-transparent',

      'text-(--input-color)',
      'disabled:text-(--input-disabled-color)',

      'placeholder:text-(--input-placeholder-color)',

      'min-h-[95px] max-h-[350px]',
      {
         'text-[16px] rounded-[10px]': !size || size === 'md',
         'text-[18px] rounded-[10px]': size === 'lg',
         'text-[15px] rounded-[9px]': size === 'sm',
      },
   );
};

// DROPDOWN

export const dropdownContainerClass = ({
   disabled = false,
   error = false,
   size = 'md',
}) => {
   return clsx(
      'flex w-full border-2',

      'bg-(--color-input-bg-color)',
      'has-[:disabled]:bg-(--color-input-disabled-bg-color)',

      'border-(--color-input-border-color)',
      {
         'hover:border-(--color-input-border-focus-color)': !error && !disabled,
         'border-(--color-input-border-error-color)': error,
         'focus-within:border-(--color-input-border-focus-color)':
            !error && !disabled,
      },

      {
         'h-11 rounded-[10px]': !size || size === 'md',
         'h-12 rounded-[12px]': size === 'lg',
         'h-10 rounded-[9px]': size === 'sm',
      },
   );
};
export const dropdownInputClass = ({ size = 'md', hasSuffix = false }) => {
   const suffixWidth =
      !size || size === 'md'
         ? 'w-[calc(100%-66px)]'
         : size === 'lg'
           ? 'w-[calc(100%-66px)]'
           : size === 'sm'
             ? 'w-[calc(100%-64px)]'
             : 'w-[calc(100%-66px)]';
   const noSuffixWidth =
      !size || size === 'md'
         ? 'w-[calc(100%-44px)]'
         : size === 'lg'
           ? 'w-[calc(100%-44px)]'
           : size === 'sm'
             ? 'w-[calc(100%-42px)]'
             : 'w-[calc(100%-44px)]';
   const width = hasSuffix ? suffixWidth : noSuffixWidth;
   return clsx(
      width,
      'h-full border-none outline-none font-medium',

      'bg-transparent',

      'text-(--color-input-color)',
      'disabled:text-(--color-input-disabled-color)',

      'placeholder:text-(--color-input-placeholder-color)',

      'disabled:cursor-default disabled:truncate',

      {
         'rounded-[10px] text-[16px] pl-3.75': !size || size === 'md',
         'rounded-[12px] text-[18px] pl-4.5': size === 'lg',
         'rounded-[9px] text-[16px] pl-3': size === 'sm',
      },
   );
};
export const dropdownTriggerClass = ({ size = 'md', hasSuffix = false }) => {
   const suffixWidth =
      size === 'md' || size === 'lg' || !size ? 'w-16' : 'w-15.5';
   const noSuffixWidth =
      size === 'md' || size === 'lg' || !size ? 'w-11' : 'w-10.5';
   const width = hasSuffix ? suffixWidth : noSuffixWidth;
   return clsx(
      width,
      'h-full flex items-center justify-center rounded-[20px] select-none',
   );
};
export const dropdownSuffixClass = ({ size = 'md' }) => {
   return clsx('flex items-center justify-center rounded-[20px] select-none', {
      'h-8 w-8': size === 'md' || size === 'lg' || !size,
      'h-7 w-7': size === 'sm',
   });
};
export const dropdownTriggerIconClass = ({ disabled = false, size = 'md' }) => {
   return clsx(
      'bg-transparent text-[#808080] rounded-full flex items-center justify-center outline-none border-none',
      {
         'cursor-pointer hover:bg-(--input-suffix-hover-and-focus-bg) focus:bg-(--input-suffix-hover-and-focus-bg)':
            !disabled,
      },
      {
         'h-8 w-8': size === 'md' || size === 'lg' || !size,
         'h-7 w-7': size === 'sm',
      },
   );
};
export const dropdownMenuClass = () => {
   return clsx(
      'rounded-[14px] outline-none! bg-(--color-input-menu-bg-color) shadow-[0_1px_20px_0_rgba(13,46,105,0.07),0_1px_20px_0_rgba(13,46,105,0.07)]',
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
