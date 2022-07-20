import React from 'react';
import TypeCard from './TypeCard';

const ScrollBarHor = ({ bodyParts, bodyPart, setBodyPart }) => {
  return (
    <div className="exostype w-[85%] px-5 h-[300px] mx-auto my-10 flex flex-row gap-10 overflow-x-scroll scrolling ">
      {' '}
      {bodyParts?.map((bp) => (
        <TypeCard
          key={bp.name || bp}
          selectedPart={bodyPart}
          bodyPart={bp}
          setBodyPart={setBodyPart}
        />
      ))}
    </div>
  );
};

export default ScrollBarHor;
