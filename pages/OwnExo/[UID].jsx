import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import fetchData, { options } from '../../lib/fetchData';
import Link from 'next/link';
import ExoCard from '../components/ExoCard';
import Footer from '../components/Footer';
import Image from 'next/image';
const OwnExo = ({ filteredexos, user }) => {
  const [deletemessage, setdeletemessage] = useState(false);
  return (
    <div className="flex flex-col gap-12">
      <Navbar currUser={JSON.parse(user)} />
      <div
        className={`fixed top-20 ${
          !deletemessage ? 'right-[-100%] ' : 'right-4 '
        } transition-all  z-20 flex flex-row bg-black text-white p-4 rounded-md w-fit items-center justify-center gap-5`}
      >
        <p className="">exercise Deleted seccessfully</p>
        <Image
          height={32}
          width={32}
          src="/check.png"
          alt="checked"
          className=""
        />
      </div>
      <div className="bg-gradient-to-b from-blue-900 to-cyan-900 text-white flex flex-col gap-5 w-[85%] mx-auto p-5 rounded-md">
        <h1 className="text-2xl">Your Exercises : </h1>
        <div className="flex flex-row flex-wrap gap-5 items-center justify-center">
          {filteredexos.map((exo) => (
            <ExoCard
              exo={exo}
              currUser={user}
              mine={true}
              setdeletemessage={setdeletemessage}
              key={exo.name}
              DoesexoExist={true}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
//REMOVE ADD FROM EXOCARDS
export async function getServerSideProps(context) {
  const { user } = context.query;
  const prisma = new PrismaClient();
  const userexo = await prisma.userfavorite.findMany({
    where: {
      UID: JSON.parse(user).id,
    },
  });

  const returnedData = await fetchData(
    'https://exercisedb.p.rapidapi.com/exercises',
    options
  );

  const filteredexos = returnedData.filter((exo) =>
    userexo.some((userexo) => userexo.exo_Id === exo.id)
  );

  return {
    props: {
      filteredexos,
      user,
    },
  };
}
export default OwnExo;
