import { useState } from 'react';
import { toast } from 'react-hot-toast';
import IconButton from './IconButton';
import { CheckIcon, CopyIcon } from './Icons';
import { handleError, PsshArray } from '../utils';

interface ResultProps {
  pssh: PsshArray[number];
  ind: number;
}

export default function Result({ pssh, ind }: ResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard
      .writeText(pssh.data)
      .then(() => setTimeout(() => setCopied(false), 2000))
      .catch(() => {
        handleError('Failed copying the PSSH', toast.error);
      });
  };

  return (
    <div className="flex flex-col gap-1 animate-fadeIn">
      <div className="flex gap-2 items-center justify-between">
        <span className="font-semibold text-lg">{pssh.type} PSSH</span>
        <div className="flex items-center gap-2">
          {copied ? <span className="italic">Copied</span> : null}
          <IconButton
            disabled={copied}
            altText="Click to copy"
            onClick={handleCopy}
            className={`bg-neutral-800 hover:bg-neutral-700 focus-visible:bg-neutral-700 transition-colors p-2 rounded-full border border-neutral-700 ${
              copied ? 'text-green-500 border-green-800' : 'text-gray-200'
            }`}
          >
            {!copied ? (
              <CopyIcon className="h-6 w-6" />
            ) : (
              <CheckIcon className="h-6 w-6" />
            )}
          </IconButton>
        </div>
      </div>
      <span
        className="mt-1 break-words text-sm bg-neutral-800 border border-neutral-700 rounded-xl p-3"
        aria-hidden
      >
        {pssh.data}
      </span>
    </div>
  );
}
