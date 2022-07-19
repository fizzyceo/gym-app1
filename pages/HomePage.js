import Link from 'next/link';
import React, { useRef, useState } from 'react';
import Exercise from './Exercise';
import SearchBar from './components/SearchBar';
import ScrollBarHor from './components/ScrollBarHor';
import Image from 'next/image';
const HomePage = ({ currUser, setAddmessage, userexos }) => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');

  const Exo = useRef(null);
  return (
    <div className="min-h-screen mt-1 py-8 w-screen bg-slate-800">
      <div className=" flex flex-row-reverse items-center justify-between border-l-2 rounded-lg overflow-hidden bg-slate-300 border-blue-800 w-[80%] mx-auto shadow-lg shadow-cyan-500">
        <Image
          src="/Banner.jpg"
          height={550}
          width={450}
          alt="Banner"
          //placeholder="blur"
          //blurDataURL="/Banner.jpg"
        />
        <div className="text-lg  w-[60%]  px-9 text-left">
          <h2 className="text-1xl text-cyan-700 font-bold my-2">Gym-Nation</h2>
          <h1 className="text-3xl font-bold my-2 text-cyan-900">
            Sweat, Decompress <br /> & repeat
          </h1>

          <p className="my-8">Click to check body building exercises</p>
          <a
            href="#Exos"
            onClick={() =>
              Exo.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            className="px-5 py-4 font-medium text-white bg-cyan-800 rounded-sm"
          >
            Explore exercises
          </a>
        </div>
      </div>
      <h1
        ref={Exo}
        className="text-9xl text-cyan-700 opacity-60 w-[80%] mx-auto my-10"
      >
        Exercises
      </h1>

      <SearchBar
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercise
        currUser={currUser}
        setExercises={setExercises}
        bodyPart={bodyPart}
        userexos={userexos?.userfavors}
        setAddmessage={setAddmessage}
        exercises={exercises}
      />
    </div>
  );
};

export default HomePage;
