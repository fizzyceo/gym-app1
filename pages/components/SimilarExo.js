import React from 'react';
import ExoCard from './ExoCard';
import Loader from './Loader';

const SimilarExo = ({ currUser, targetexos, EquipExo }) => {
  return (
    <div className="w-[85%] mx-auto">
      <h1 className="text-3xl ">
        Exercices that <span className="font-bold text-cyan-600">targets</span>{' '}
        the same muscules
      </h1>
      <div className=" h-[510px] items-center bg-cyan-900 rounded-md px-5  mx-auto my-10 flex flex-row gap-10 overflow-x-scroll scrolling">
        {targetexos.length ? (
          targetexos.map((item, index) => (
            <ExoCard key={index} exo={item} currUser={currUser} />
          ))
        ) : (
          <Loader />
        )}
      </div>
      <h1 className="text-3xl  ">
        Exercices that uses the same{' '}
        <span className="font-bold text-cyan-600">equipments</span>
      </h1>
      <div className="  h-[510px] items-center bg-cyan-900 rounded-md px-5   my-10 flex flex-row gap-10 overflow-x-scroll scrolling">
        {EquipExo.length ? (
          EquipExo.map((item, index) => (
            <ExoCard key={index} exo={item} currUser={currUser} />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default SimilarExo;
