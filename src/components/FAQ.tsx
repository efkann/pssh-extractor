import { PropsWithChildren } from 'react';

interface HighlightedLinkProps {
  href: string;
}

const HighlightedLink = ({
  href,
  children,
}: PropsWithChildren<HighlightedLinkProps>) => {
  return (
    <a className="font-medium text-[#00C896]" href={href}>
      {children}
    </a>
  );
};

const FAQItem = ({ children }: PropsWithChildren) => {
  return <details className="bg-neutral-800 rounded-lg">{children}</details>;
};

const Question = ({ children }: PropsWithChildren) => {
  return (
    <summary className="cursor-pointer p-3 font-semibold">{children}</summary>
  );
};

const Answer = ({ children }: PropsWithChildren) => {
  return (
    <p className="border-t border-neutral-500 border-opacity-50 p-4 text-neutral-300">
      {children}
    </p>
  );
};
export default function FAQ() {
  return (
    <div className="mt-8 flex flex-col gap-2">
      <h2 className="sr-only">Frequently Asked Questions</h2>
      <FAQItem>
        <Question>What&apos;s this ?</Question>
        <Answer>
          An open-source website where you can quickly extract the Protection
          System Specific Header (PSSH) by using the initialization file. There
          are generally 2 PSSH extracted. Widevine and Playready. You can check
          <HighlightedLink href="https://emarsden.github.io/pssh-box-wasm/decode/">
            &nbsp;Emarsden&apos;s tool&nbsp;
          </HighlightedLink>
          to validate your PSSH. This site is for educational purposes only and
          does not guarantee anything.
        </Answer>
      </FAQItem>
      <FAQItem>
        <Question>How does this work, any limitations ?</Question>
        <Answer>
          File reading and calculations are done in your browser. So
          there&apos;s no interaction with any server. There&apos;s only one
          limitation. Your file should be under 1MB, generally initialization
          files are 2-3 KB, so you should be fine. However, if you come across
          anything different, please create an issue on
          <HighlightedLink href="https://github.com/efkann/pssh-extractor/issues">
            &nbsp;Github&nbsp;
          </HighlightedLink>
        </Answer>
      </FAQItem>
      <FAQItem>
        <Question>
          What does this mean `Failed to extract PSSH from your file` ?
        </Question>
        <Answer>
          It&apos;s possible that you&apos;ve passed an invalid file. Make sure
          you use the initialization file. If this error still occurs, feel free
          to create an issue on
          <HighlightedLink href="https://github.com/efkann/pssh-extractor/issues">
            &nbsp;Github&nbsp;
          </HighlightedLink>
        </Answer>
      </FAQItem>
      <FAQItem>
        <Question>Why ?</Question>
        <Answer>Why not ?</Answer>
      </FAQItem>
    </div>
  );
}
