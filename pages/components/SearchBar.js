import React, { useState, useEffect } from 'react';
import { fetchData, options } from '../lib/fetchData';
import Loader from './Loader';
import ScrollBarHor from './ScrollBarHor';
const SearchBar = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');

  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fun = async () => {
      try {
        const Searchres = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
          options
        );

        Searchres?.unshift('All');

        setBodyParts(Searchres);
      } catch (err) {
        console.log(err);
      }
    };
    fun();
  }, []);
  const handleSearch = async () => {
    if (search) {
      const Searchres = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises',
        options
      );

      const exercisesList = Searchres.filter(
        (exo) =>
          exo.name.toLowerCase().includes(search) ||
          exo.target.toLowerCase().includes(search) ||
          exo.bodyPart.toLowerCase().includes(search) ||
          exo.equipment.toLowerCase().includes(search)
      );
      setSearch('');
      setExercises(exercisesList);
    }
  };
  return (
    <div className="mx-auto rounded-md w-[90%] bg-slate-700 text-center py-8 ">
      <h1 className="text-2xl text-white pb-3">
        Catalogue of Exercises <br /> You should know
      </h1>

      <div className="mt-3 rounded-md flex flex-row gap-0  w-[67%] mx-auto pb-4 ">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search for an Exercise..."
          className="py-5 px-2 outline-none w-[80%] "
        />
        <button
          className="bg-cyan-800 w-[20%] text-slate-300 px-5 py-4"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {bodyParts ? (
        <ScrollBarHor
          bodyParts={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default SearchBar;
