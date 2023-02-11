import Image from 'next/image';
import React from 'react';

const Details = ({ exoDetails }) => {
  if (exoDetails) {
    const { name, gifUrl, bodyPart, equipment, target } = exoDetails;
    return (
      <div className="flex mx-auto flex-wrap flex-row  bg-slate-800 text-white  gap-9 xl:w-[90%] sm:w-[70%] p-8 rounded-md  ">
        <div className=" my-auto mx-auto  rounded-md">
          <Image src={gifUrl} alt={name} width={600} height={600} />
        </div>
        <div className="flex flex-col gap-10 ">
          <h1 className="text-3xl ">{name}</h1>
          <p className="text-xl space-x-2 space-y-2">
            Exercises are meant to keep you healthy , {name}'s exercise is{' '}
            <br /> a commun exercise that targets your {target} and can be
            acheived by using {equipment}. <br />
            <br />
            Scroll for more tutorial videos & Similar exercises
          </p>
          <div className="flex gap-5 flex-col">
            <div className="flex flex-row items-center justify-center gap-2 w-fit">
              <div className="p-3 rounded-full border-2 border-cyan-400">
                <Image
                  width={64}
                  height={64}
                  src="/pose.png"
                  alt=""
                  className="p-3 rounded-full border-2 border-cyan-400"
                />
              </div>
              <h2 className="text-2xl">{bodyPart}</h2>
            </div>
            <div className="flex flex-row items-center justify-center gap-2 w-fit">
              <div className="p-3 rounded-full border-2 border-cyan-400">
                <Image
                  width={64}
                  height={64}
                  src="/body.png"
                  alt=""
                  className="p-3 rounded-full border-2 border-cyan-400"
                />
              </div>
              <h2 className="text-2xl">{target}</h2>
            </div>
            <div className="flex flex-row items-center justify-center gap-2 w-fit">
              <div className="p-3 rounded-full border-2 border-cyan-400">
                <Image width={64} height={64} alt="" src="/barbell.png" />
              </div>
              <h2 className="text-2xl">{equipment}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    <p>Loading....</p>;
  }
};

export default Details;
