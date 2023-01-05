import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { Output } from '../types';
import { extractPSSHArray, handleError } from '../utils';

interface DropAreaProps {
  setOutput: React.Dispatch<React.SetStateAction<Output | undefined>>;
}

export default function DropArea({ setOutput }: DropAreaProps) {
  const onDrop = useCallback(async <T extends File>(acceptedFiles: T[]) => {
    for (const file of acceptedFiles) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onabort = () => {
        handleError('Process aborted while reading your file.', toast.error);
      };
      reader.onerror = () => {
        handleError('An error occured while reading your file.', toast.error);
      };
      reader.onload = () => {
        try {
          const buffer = reader.result;
          if (!buffer) {
            throw new Error('Something went wrong while reading your file.');
          }
          const psshArray = extractPSSHArray(buffer as ArrayBuffer);
          setOutput({
            filename: file.name,
            psshArray: psshArray,
          });
        } catch (err) {
          if (err instanceof Error) {
            handleError(err.message, toast.error);
          }
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isFocused } = useDropzone({
    onDrop,
    maxSize: 1000000, // 1MB
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`mt-4 flex flex-1 flex-col items-center justify-center p-8 min-h-[320px] border-2 border-neutral-700 border-dashed text-neutral-400 bg-neutral-800 text-neutral-5  00 outline-none ${
        isDragAccept ? 'opacity-50 border-4 border-blue-400' : ''
      }
        ${isFocused ? 'border-blue-500' : ''}`}
    >
      <input {...getInputProps()} />
      <p
        className={`text-lg text-center italic ${
          isDragAccept ? 'text-2xl' : ''
        }`}
      >
        Drag & drop your init file here, or click to select it
      </p>
    </div>
  );
}
