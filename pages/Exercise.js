import React, { useEffect, useState } from 'react';
import ExoCard from './components/ExoCard';
import Pagination from '@mui/material/Pagination';
import { fetchData, options } from './libs/fetchData';
import Loader from './components/Loader';
const Exercise = ({
  currUser,
  setExercises,
  bodyPart,
  userexos,
  exercises,
  setAddmessage,
}) => {
  //Pagination logic
  const [currentPage, setcurrentPage] = useState(1);
  const exoPerPage = 9;
  const indexOfLastExo = currentPage * exoPerPage;
  const indexOfFirstExo = indexOfLastExo - exoPerPage;
  const DoesexoExist = false;
  const paginate = (event, value) => {
    setcurrentPage(value);
    window.scrollTo({ top: 1100, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchExoData = async () => {
      const returnedData = [];
      if (bodyPart === 'all') {
        returnedData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises',
          options
        );
      } else {
        returnedData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          options
        );
      }
      setExercises(returnedData);
    };
    fetchExoData();
  }, [bodyPart, setExercises]);

  const currentExos = exercises?.slice(indexOfFirstExo, indexOfLastExo);
  console.log(currentExos);
  return (
    <div className="my-14  text-white mx-auto rounded-md w-[80%]  bg-gradient-to-b from-slate-700 to-cyan-900 text-center pt-8 ">
      <h1 className="text-3xl">{'All'} Results</h1>
      {/** */}{' '}
      <div className=" flex flex-row flex-wrap gap-8 w-[90%] justify-center items-center mx-auto my-4">
        {currentExos ? (
          currentExos?.map((exo) => (
            <ExoCard
              key={exo.id}
              exo={exo}
              currUser={currUser}
              setAddmessage={setAddmessage}
              userexos={userexos}
              mine={false}
              DoesexoExist={
                userexos?.filter((e) => e.exo_Id === exo.id).length > 0
                  ? DoesexoExist
                  : !DoesexoExist
              }
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
      <div className="text-white flex items-center justify-center mb-0 mt-5 bg-cyan-500 px-5 py-3 w-fit mx-auto rounded-full">
        {exercises.length > 9 && (
          <Pagination
            color="primary"
            count={Math.ceil(exercises.length / 9)}
            page={currentPage}
            onChange={paginate}
          />
        )}
      </div>
    </div>
  );
};

export default Exercise;
