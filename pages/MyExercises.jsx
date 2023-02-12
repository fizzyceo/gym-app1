import React, { useState } from 'react';
import Head from 'next/head';
import supabase, { supabaseNextAuth } from '../utils/SupabaseCLI';
import { getSession } from 'next-auth/react';
import Navbar from './components/Navbar';
import Image from 'next/image';
import ExoCard from './components/ExoCard';
import fetchData, { options } from '../lib/fetchData';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
const OwnExo = ({ filteredexos, user }) => {
  const deletemessage = useSelector((state) => state.popups.deleteMsg);
  // const [deletemessage, setdeletemessage] = useState(false);
  console.log(deletemessage);
  return (
    <div className="flex flex-col gap-12">
      <Head>
        <title>Exercises - {user.data[0].name}</title>
        <meta
          name="description"
          content="Come and see every gym exercises and enjoy the experience of browsing, adding exercises to your routines "
        />
        <link rel="icon" href="/dumbbell.png" />
      </Head>
      <Navbar currUser={user} />
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
      <div className="bg-gradient-to-b from-blue-900 to-cyan-900 min-h-screen text-white flex flex-col gap-5 w-[85%] mx-auto p-5 rounded-md">
        <h1 className="text-2xl">Your Exercises : </h1>
        <div className="flex flex-row flex-wrap gap-5 items-center justify-center">
          {filteredexos.map((exo) => (
            <ExoCard
              exo={exo}
              currUser={user}
              mine={true}
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
export async function getServerSideProps(cxt) {
  const session = await getSession(cxt);
  if (session) {
    //  const user = await fetchuser(session);

    // const favs = await fetch(`${server}/api/UserFavor/${user.user.id}`);
    //  const favdata = await favs.json();

    const user = await supabaseNextAuth
      .from('users')
      .select('*')
      .eq('email', session.user.email);

    const favs = await supabase
      .from('user_fav')
      .select('*')
      .eq('id', user.data[0].id);

    const returnedData = await fetchData(
      'https://exercisedb.p.rapidapi.com/exercises',
      options
    );

    const filteredexos = returnedData.filter((exo) =>
      favs.data.find((userexo) => userexo.exo_id === parseInt(exo.id))
    );

    return {
      props: {
        filteredexos,
        user,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
export default OwnExo;
