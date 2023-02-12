import React from 'react';
import { useSession, signIn } from 'next-auth/react';
import Navbar from './components/Navbar';
import Link from 'next/link';

import Footer from './components/Footer';
import Image from 'next/image';
import { server } from '../config/server';

const Login = () => {
  const handleGoogleLogin = async () => {
    signIn('google', {
      callbackUrl: server,
    });
  };
  return (
    <div className="w-full min-h-screen bg-slate-900  flex flex-col gap-10">
      <Navbar />
      <div className="w-[60%] p-5 rounded-md bg-slate-100 flex flex-col gap-7 mx-auto">
        <button
          className="w-[90%] py-6 space-x-3 mx-auto  text-white bg-black outline-none flex flex-row  rounded-md justify-center items-center gap-5"
          onClick={() => handleGoogleLogin()}
        >
          {' '}
          <Image
            width={32}
            height={32}
            className=""
            src="/google.png"
            alt=""
          />{' '}
          <span>Sign in with google</span>{' '}
        </button>
        <button
          className="flex flex-row justify-center items-center gap-5 w-[90%] py-6 space-x-3 mx-auto rounded-md bg-blue-600 text-white outline-none"
          onClick={() => signIn('facebook')}
        >
          {' '}
          <Image
            width={32}
            height={32}
            className=""
            src="/facebook.png"
            alt=""
          />
          <span>Sign in with facebook</span>
        </button>
        <div className="w-full flex flex-col items-center relative justify-center gap-5 m-3">
          <div className="font-semibold absolute inset-0 bg-black bg-opacity-25 backdrop-blur-md rounded-md right-5 justify-center items-center flex text-white text-2xl">
            Comming Soon
          </div>
          <h1 className="self-center text-3xl ">Via account</h1>
          <input
            type="text"
            className="p-3 outline-none rounded-md w-[90%] mx-auto"
            placeholder="Your Email..."
          />
          <input
            type="password"
            placeholder="Your Password..."
            className="p-3 outline-none rounded-md w-[90%] mx-auto"
          />
          <button className="self-center bg-green-600 w-fit py-4 px-10 rounded-md text-white">
            Log In
          </button>
          <div className="text-lg w-[90%] mx-auto ">
            you dont have an account?{' '}
            <Link href="#">
              <span className="text-base cursor-pointer text-blue-800 ">
                {' '}
                Register here
              </span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
