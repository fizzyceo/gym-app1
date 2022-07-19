import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Loader from './Loader';

const YTVids = ({ exoDetails, exoVids }) => {
  console.log(exoVids);
  if (exoDetails) {
    return (
      <div className="mx-auto w-[85%] my-4">
        <h1 className="text-3xl ">
          Watch{' '}
          <span className="text-cyan-600 font-bold"> {exoDetails.name}</span>s
          exercise tutorials
        </h1>
        <div className="flex min-h-[300px] flex-row gap-10 flex-wrap  my-8 text-slate-800 bg-slate-800 px-2 items-center justify-center py-6">
          {exoVids.length ? (
            exoVids.slice(0, 3).map((item, index) => (
              <Link
                key={index}
                href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
                target="_blank"
              >
                <div className="cursor-pointer flex border-t-4 rounded-md h-[400px] bg-slate-100 border-cyan-600 flex-col items-center justify-center p-4 gap-4">
                  <Image
                    width={350}
                    height={350}
                    alt=""
                    className=" rounded-md max-h-[85%]"
                    src={item.video.thumbnails[0].url}
                  />
                  <h1 className="text-lg">{item.video.title}</h1>
                </div>
              </Link>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    );
  }
};

export default YTVids;
