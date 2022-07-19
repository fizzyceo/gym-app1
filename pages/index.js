import Head from 'next/head';
import Image from 'next/image';

import Navbar from './components/Navbar';
import Link from 'next/link';
import HomePage from './HomePage';
import Exercise from './Exercise';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { fetchuser } from './libs/fetchData';
import Footer from './components/Footer';

export default function Home({ user, userexos }) {
  const [currUser, setcurrUser] = useState(user?.user || {}); //put on the contexte
  const [favexosID, setfavexosID] = useState(
    userexos?.userfavors.map((fav) => fav.exo_Id) || []
  );
  const [addmessage, setAddmessage] = useState(false);

  //fix when the exercise is already added to the user's liste

  return (
    <div className="bg-slate-300 font-sans">
      <Navbar userexos={userexos} currUser={currUser} />

      <div
        className={`fixed top-20 ${
          !addmessage ? 'right-[-100%] ' : 'right-4 '
        } transition-all  flex flex-row bg-black text-white p-4 rounded-md w-fit items-center justify-center gap-5`}
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

      <HomePage
        currUser={currUser}
        setAddmessage={setAddmessage}
        userexos={userexos}
      />
      <Footer />
    </div>
  );
}
export async function getServerSideProps(cxt) {
  const session = await getSession(cxt);
  if (session) {
    const user = await fetchuser(session);

    const favs = await fetch(
      `http://localhost:3000/api/UserFavor/${user.user.id}`
    );
    const favdata = await favs.json();

    return {
      props: {
        user: user,
        userexos: favdata,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
