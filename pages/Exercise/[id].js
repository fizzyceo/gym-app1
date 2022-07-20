import React, { useEffect, useState } from 'react';
import fetchData, { options, YToptions } from '../../lib/fetchData';
import { useRouter } from 'next/router';
import Details from '../components/Details';
import Navbar from '../components/Navbar';
import YTVids from '../components/YTVids';
import SimilarExo from '../components/SimilarExo';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
const ExoDetails = ({ data, youtubedata, targetExos, EquipExo }) => {
  const router = useRouter();
  const currUser = JSON.parse(router.query.currUser);
  //THERE IS NO USER HEREE!!!
  console.log(currUser);
  return (
    <div className="w-full flex flex-col gap-12 min-h-screen overflow-x-hidden">
      <Navbar currUser={currUser} />
      {data ? <Details exoDetails={data} /> : <Loader />}

      <YTVids exoDetails={data} exoVids={youtubedata.contents} />

      <SimilarExo
        currUser={currUser}
        targetexos={targetExos}
        EquipExo={EquipExo}
      />
      <Footer />
    </div>
  );
};

export async function getServerSideProps(cxt) {
  console.log(cxt.query);
  const { id } = cxt.query;
  if (id) {
    const data = await fetchData(
      `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
      options
    );
    const youtubeVids = 'https://youtube-search-and-download.p.rapidapi.com';

    if (data) {
      const youtubedata = await fetchData(
        `${youtubeVids}/search?query=${data.name}`,
        YToptions
      );

      const targetExos = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/target/${data.target}`,
        options
      );

      const EquipExo = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/equipment/${data.equipment}`,
        options
      );

      return {
        props: {
          data: data,
          youtubedata: youtubedata,
          targetExos: targetExos,
          EquipExo: EquipExo,
        },
      };
    }
  } else {
    return {
      props: {},
    };
  }
}

export default ExoDetails;
