import { array, bool, func, number, string } from 'prop-types';
import { memo, useCallback, useMemo } from 'react';
import { prettyFileSize } from './helpers';
const FileItem = memo(
   ({
      index = 0,
      isEnabled = false,
      name = '',
      onChange,
      size = 0,
      value = [],
   }) => {
      const fileSize = useMemo(() => prettyFileSize(size), [size]);
      const removeFile = useCallback(() => {
         if (typeof onChange === 'function') {
            const newFiles = value.filter((_, order) => order !== index);
            onChange(newFiles);
         }
      }, [onChange, index, value]);
      return (
         <li className='px-3 py-2 rounded-[10px] flex items-center justify-between border-2 border-solid border-(--file-uploader-border-color) min-h-11'>
            <div className='w-[calc(100%-100px)] flex items-center gap-2'>
               <span className='text-(--file-uploader-subtitle-color)'>
                  <svg fill='none' height='22' viewBox='0 0 16 16' width='22'>
                     <path
                        d='M12.0533 8.27949L7.93328 12.4062C7.39315 12.8862 6.69004 13.1417 5.96776 13.1204C5.24548 13.0991 4.55861 12.8027 4.04766 12.2918C3.53671 11.7808 3.24028 11.094 3.21902 10.3717C3.19776 9.64939 3.45327 8.94628 3.93328 8.40616L9.26661 3.07282C9.58503 2.77036 10.0074 2.60171 10.4466 2.60171C10.8858 2.60171 11.3082 2.77036 11.6266 3.07282C11.9368 3.38722 12.1108 3.81114 12.1108 4.25282C12.1108 4.69451 11.9368 5.11843 11.6266 5.43282L7.02661 10.0262C6.98109 10.0752 6.92635 10.1148 6.86553 10.1426C6.80471 10.1705 6.73899 10.1861 6.67213 10.1886C6.60528 10.1911 6.53858 10.1804 6.47587 10.1571C6.41315 10.1338 6.35564 10.0983 6.30661 10.0528C6.25758 10.0073 6.218 9.95256 6.19013 9.89174C6.16226 9.83092 6.14664 9.7652 6.14416 9.69835C6.14168 9.63149 6.1524 9.5648 6.1757 9.50208C6.199 9.43936 6.23442 9.38185 6.27994 9.33282L9.69994 5.91949C9.82548 5.79395 9.89601 5.62369 9.89601 5.44616C9.89601 5.26862 9.82548 5.09836 9.69994 4.97282C9.57441 4.84729 9.40415 4.77676 9.22661 4.77676C9.04908 4.77676 8.87881 4.84729 8.75328 4.97282L5.33328 8.39949C5.16215 8.56929 5.02632 8.77129 4.93363 8.99384C4.84094 9.21638 4.79322 9.45508 4.79322 9.69616C4.79322 9.93723 4.84094 10.1759 4.93363 10.3985C5.02632 10.621 5.16215 10.823 5.33328 10.9928C5.68286 11.3258 6.14715 11.5116 6.62994 11.5116C7.11274 11.5116 7.57703 11.3258 7.92661 10.9928L12.5199 6.39282C13.0499 5.82412 13.3384 5.07194 13.3246 4.29473C13.3109 3.51753 12.9961 2.77599 12.4464 2.22634C11.8968 1.67668 11.1552 1.36184 10.378 1.34812C9.60083 1.33441 8.84864 1.6229 8.27994 2.15282L2.94661 7.48616C2.22741 8.28271 1.8433 9.32606 1.8743 10.3988C1.9053 11.4716 2.34903 12.491 3.11304 13.2447C3.87704 13.9984 4.9024 14.4282 5.97547 14.4446C7.04854 14.461 8.08657 14.0628 8.87328 13.3328L12.9999 9.21282C13.0621 9.15066 13.1114 9.07687 13.1451 8.99566C13.1787 8.91444 13.196 8.8274 13.196 8.73949C13.196 8.65158 13.1787 8.56454 13.1451 8.48332C13.1114 8.40211 13.0621 8.32832 12.9999 8.26616C12.9378 8.204 12.864 8.15469 12.7828 8.12105C12.7016 8.08741 12.6145 8.0701 12.5266 8.0701C12.4387 8.0701 12.3517 8.08741 12.2704 8.12105C12.1892 8.15469 12.1154 8.204 12.0533 8.26616V8.27949Z'
                        fill='currentColor'
                     />
                  </svg>
               </span>
               <span className='break-all font-medium text-[14px] text-(--file-uploader-main-text-color)'>
                  {name}
               </span>
            </div>
            <div className='flex items-center justify-center gap-3'>
               <span className='text-(--file-uploader-subtitle-color) text-[14px]'>
                  {fileSize}
               </span>
               {isEnabled && (
                  <button
                     className='font-bold text-[14px] text-(--file-uploader-remove-text-color) bg-(--file-uploader-remove-bg-color) rounded-[14px] w-6.5 h-6.5 flex items-center justify-center outline-none cursor-pointer'
                     onClick={removeFile}
                     type='button'
                  >
                     ✕
                  </button>
               )}
            </div>
         </li>
      );
   },
);
FileItem.propTypes = {
   index: number,
   isEnabled: bool,
   name: string,
   onChange: func,
   size: number,
   value: array,
};
export default FileItem;
