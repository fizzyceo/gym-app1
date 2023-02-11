import { PrismaClient } from '@prisma/client';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';

import React, { useState } from 'react';
import { supabaseNextAuth } from '../utils/SupabaseCLI';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const Profile = ({ user, isnotLogged }) => {
  const [verified, setVerified] = useState(user.emailVerified ? true : false);
  const [loading, setLoading] = useState(false);
  console.log(verified);

  const verification = async () => {
    const favs = await fetch(`/api/verify`, {
      method: 'POST',
      body: JSON.stringify({
        userid: user.id,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const favdata = await favs.json();
    setLoading(true);
    setLoading(false);
    setVerified(true);
  };
  if (isnotLogged) {
    return <a href="/Login">Login first</a>;
  }
  return (
    <div className="flex flex-col  gap-12 bg-slate-200 w-full min-h-screen">
      <Navbar currUser={user} />
      <section className="flex mx-auto px-10 py-7 flex-row justify-between text-white items-center w-[600px] rounded-md bg-slate-900 ">
        <Image
          width={160}
          height={160}
          src={user.image}
          className=" rounded-full  "
          alt=""
        />
        <div className="flex gap-10 flex-col items-start justify-center">
          <div className="flex flex-row gap-4">
            <h2>Name</h2>
            <p>{user.name}</p>
          </div>
          <div className="flex flex-row gap-4">
            <h2>Email</h2>
            <p>{user.email}</p>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <h2>Verified email</h2>
            <p>{verified ? 'True' : 'False'}</p>
            {!verified && (
              <button
                onClick={verification}
                className="bg-green-600 p-3 rounded-md"
              >
                {loading && 'Loading...'}
                Verify Now
              </button>
            )}
          </div>
        </div>
      </section>
      <div className="fixed bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    const user = await supabaseNextAuth
      .from('users')
      .select('*')
      .eq('email', session.user.email);
    console.log('this is the user confirmed ', user);
    return {
      props: {
        user: user?.data[0],
      },
    };
  } else {
    return {
      props: {
        isnotLogged: true,
      },
    };
  }
}

export default Profile;
