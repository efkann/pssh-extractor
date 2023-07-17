import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Output } from '../types';
import DropArea from '@/components/DropArea';
import FAQ from '@/components/FAQ';
import { StarIcon } from '@/components/Icons';
import Result from '@/components/Result';

export default function Home() {
  const [output, setOutput] = useState<Output>();
  const hasValidOutput = output !== undefined && output.psshArray.length > 0;
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outputRef?.current?.focus();
  }, [output]);

  return (
    <>
      <Head>
        <title>PSSH Extractor</title>
        <meta name="description" content="PSSH Extractor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center justify-items-end">
          <h1 className="text-3xl text-center font-semibold col-start-2">
            PSSH Extractor
          </h1>
          <div className="bg-neutral-100 text-neutral-600 text-sm font-medium rounded-sm hover:bg-neutral-300 transition-colors sm:static fixed right-4 bottom-4">
            <a href="https://github.com/efkann/pssh-extractor">
              <div className="flex items-center gap-1 px-2 py-1">
                <StarIcon className="h-4 w-4" />
                <span>Star</span>
              </div>
            </a>
          </div>
        </div>
        <FAQ />
        <DropArea setOutput={setOutput} />
        {hasValidOutput ? (
          <div
            className="mt-4 flex flex-col gap-4"
            tabIndex={-1}
            ref={outputRef}
          >
            <h2 className="font-semibold text-lg">Filename</h2>
            <p className="text-lg font-mono italic break-words">
              {output.filename}
            </p>
            {output.psshArray.map((pssh, ind) => (
              <Result pssh={pssh} ind={ind} key={output.filename + ind} />
            ))}
          </div>
        ) : null}
      </main>
      <Toaster reverseOrder={false} position="bottom-center" />
    </>
  );
}
