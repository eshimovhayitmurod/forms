import { any, bool, func, number, object, string } from 'prop-types';
import { memo, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import FileItem from './FileItem';
import { prettyFileSize } from './helpers';
import UploadIcon from './UploadIcon';
const FileUploader = memo(
   ({
      accept,
      isDisabled = false,
      isError = false,
      maxFiles = 10,
      maxSize = 20971520,
      minSize = 0,
      name,
      onChange,
      value = [],
   }) => {
      const memoizedValue = useMemo(
         () => (Array.isArray(value) ? value : []),
         [value],
      );
      const onDrop = useCallback(
         files => {
            if (!isDisabled && typeof onChange === 'function') {
               const merged = [...memoizedValue, ...files];
               const unique = [];
               const seen = new Set();
               for (const f of merged) {
                  const key = f?.name + '_' + f?.size;
                  if (!seen.has(key)) {
                     seen.add(key);
                     unique.push(f);
                  }
               }
               const newValue = unique.slice(0, maxFiles);
               onChange(newValue);
            }
         },
         [onChange, isDisabled, memoizedValue, maxFiles],
      );
      const disabled = useMemo(
         () => isDisabled || memoizedValue?.length >= maxFiles,
         [isDisabled, memoizedValue, maxFiles],
      );
      const { getRootProps, getInputProps, isDragActive } = useDropzone({
         accept,
         disabled,
         maxFiles,
         maxSize,
         minSize,
         onDrop,
         onDropRejected: e => {
            console.log('Rejected files:', e);
         },
      });
      const hasValue = useMemo(
         () => memoizedValue?.length > 0,
         [memoizedValue],
      );
      const maxFileSize = useMemo(() => prettyFileSize(maxSize), [maxSize]);
      const allowedFormats = useMemo(() => {
         const allowedFormats = Object.values(accept || {}).join(', ');
         return allowedFormats;
      }, [accept]);
      const uploaderClass = useMemo(() => {
         const baseClass =
            'focus:outline-none min-h-[250px] flex items-center justify-center border-2 border-(--file-uploader-border-color) border-dashed rounded-xl p-6 text-center';
         const errorClass = isError
            ? 'border-(--file-uploader-border-error-color)'
            : '';
         const activeClass = isDragActive
            ? 'bg-(--file-uploader-active-bg-color) border-(--file-uploader-border-focus-color)!'
            : '';
         const disabledClass = disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:bg-(--file-uploader-active-bg-color) hover:border-(--file-uploader-border-focus-color) focus:bg-(--file-uploader-active-bg-color) focus:border-(--file-uploader-border-focus-color)';
         const uploaderClass = `${baseClass} ${errorClass} ${activeClass} ${disabledClass}`;
         return uploaderClass;
      }, [disabled, isError, isDragActive]);
      return (
         <div className='border-2 border-(--file-uploader-border-color) rounded-[14px] p-2'>
            <div className='grid grid-cols-1 gap-2'>
               <div {...getRootProps()} className={uploaderClass}>
                  <input
                     {...getInputProps()}
                     multiple={maxFiles > 1}
                     name={name}
                  />
                  <div className='font-medium'>
                     {isDragActive ? (
                        <p className='text-[20px] text-(--file-uploader-main-text-color)'>
                           Drop the files here ...
                        </p>
                     ) : (
                        <div className='grid grid-cols-1 gap-2'>
                           <div className='flex items-center justify-center text-(--file-uploader-subtitle-color) pb-3'>
                              <UploadIcon />
                           </div>
                           <p className='text-[20px] text-(--file-uploader-main-text-color)'>
                              Click to upload or drag and drop
                           </p>
                           <p className='text-(--file-uploader-subtitle-color) text-[13px]'>
                              {maxFileSize + ' max file size'}
                           </p>
                           {accept && (
                              <p className='text-(--file-uploader-subtitle-color) text-[13px]'>
                                 Allowed file formats: {allowedFormats}
                              </p>
                           )}
                        </div>
                     )}
                  </div>
               </div>
               {hasValue && (
                  <div>
                     <ul className='grid grid-cols-1 gap-2'>
                        {memoizedValue.map((file, index) => (
                           <FileItem
                              isEnabled={!isDisabled}
                              index={index}
                              key={index}
                              name={file?.name}
                              onChange={onChange}
                              size={file?.size}
                              value={memoizedValue}
                           />
                        ))}
                     </ul>
                  </div>
               )}
            </div>
         </div>
      );
   },
);
FileUploader.propTypes = {
   accept: object,
   isDisabled: bool,
   isError: bool,
   maxSize: number,
   minSize: number,
   name: string,
   onChange: func,
   value: any,
};
export default FileUploader;
