import Image from 'next/image';
import React from 'react';

const TypeCard = ({ selectedPart, bodyPart, setBodyPart }) => {
  const changebodypart = () => {
    setBodyPart(bodyPart);
  };

  return (
    <div
      onClick={changebodypart}
      className={`p-6  cursor-pointer h-[75%] my-auto  min-w-[25%] flex flex-col border-t-4 shadow-xl hover:scale-105 transition-all shadow-slate-600 ${
        bodyPart === selectedPart
          ? ' border-cyan-600 shadow-2xl shadow-slate-100'
          : ''
      }h-full gap-4 justify-center items-center text-center bg-slate-300`}
    >
      <Image height={64} width={64} alt="" src="/weights.png" />
      <p className="text-2xl text-cyan-900 ">{bodyPart}</p>
    </div>
  );
};

export default TypeCard;
