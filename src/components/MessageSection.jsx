import React from 'react';

const MessageSection = () => {
  return (
    <div className="flex flex-col items-start text-left w-full max-w-2xl mx-auto px-2 md:px-6">
      <div className="text-2xl md:text-3xl leading-relaxed text-[var(--color-text-main)] space-y-6 font-caveat w-full font-medium">
        <p>Dear Babydoll,</p>
        <p className="indent-8 text-justify md:text-left">
          A very Happpppppy wala Birthday to you. Umm likhana toh bhot kuch hai but those are the same lines of being happy, successful, blessed, potato potato so woh kuch repeat nahi karunga but one thing that I need you to know is never ever doubt yourself. I have told you many times that you are perfect and I know everyone has flaws but your flaws indeed makes you perfect. You deserve all the love there is to offer, all the success you want to have, all the dreams and goals you want to achieve. I hope you realise how precious you are and I hope your every wish comes true. Fir se ek Happy wala Birthday to you.
        </p>
        <p className="pt-4 text-right md:text-left md:ml-auto md:w-max">
          With lovee,<br />
          Janmejay
        </p>
      </div>
    </div>
  );
};

export default MessageSection;
