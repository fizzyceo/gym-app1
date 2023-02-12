import Head from 'next/head';
import Image from 'next/image';

import Navbar from './components/Navbar';
import Link from 'next/link';
import HomePage from './HomePage';
import Exercise from './Exercise';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

import { useEffect, useState } from 'react';
import { fetchuser } from '../lib/fetchData';
import Footer from './components/Footer';
import { server } from '../config/server';
import supabase, { supabaseNextAuth } from '../utils/SupabaseCLI';
import { useDispatch, useSelector } from 'react-redux';
export default function Home({ user, userexos }) {
  const [currUser, setcurrUser] = useState(user || {}); //put on the contexte
  const [favexosID, setfavexosID] = useState(
    userexos?.map((fav) => fav?.exo_id) || []
  );
  const addmessage = useSelector((state) => state.popups.addmessage);
  //const [addmessage, setAddmessage] = useState(false);

  //fix when the exercise is already added to the user's liste

  return (
    <div className="bg-slate-300 font-sans">
      <Head>
        <title>Fizzy's Gym</title>
        <meta
          name="description"
          content="Come and see every gym exercises and enjoy the experience of browsing, adding exercises to your routines "
        />
        <link rel="icon" href="/dumbbell.png" />
      </Head>
      <Navbar userexos={userexos} uid={currUser?.id} />

      <div
        className={`fixed top-20 ${
          !addmessage ? 'right-[-100%] ' : 'right-4 '
        } transition-all  flex flex-row bg-black z-20 text-white p-4 rounded-md w-fit items-center justify-center gap-5`}
      >
        <p className="">exercise Added seccessfully</p>
        <Image
          height={32}
          width={32}
          src="/check.png"
          alt="checked"
          className=""
        />
      </div>

      <HomePage currUser={currUser} userexos={userexos} />
      <Footer />
    </div>
  );
}
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

    return {
      props: {
        user: user.data[0],
        userexos: favs.data,
      },
    };

    // return {
    //   props: {
    //     user: user,
    //     userexos: favdata,
    //   },
    // };
  } else {
    return {
      props: {},
    };
  }
}
